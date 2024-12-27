import React from 'react';
    import { X } from 'lucide-react';
    import { Button } from '../ui/Button';
    import { Input } from '../ui/Input';
    import { Select } from '../ui/Select';
    import { useForm } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import { z } from 'zod';
    import { useClientsStore, Client } from '../../store/clients';
    import { useToast } from '../ui/use-toast';

    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

    const editClientSchema = z.object({
      name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
      email: z.string().email('Email inválido'),
      phone: z.string().regex(phoneRegex, 'Telefone deve estar no formato (99) 99999-9999'),
      document: z.string().refine((val) => {
        return cpfRegex.test(val) || cnpjRegex.test(val);
      }, 'CPF/CNPJ deve estar no formato correto'),
      type: z.enum(['individual', 'company']),
      status: z.enum(['active', 'inactive']),
      category: z.string().min(1, 'Categoria é obrigatória'),
      address: z.object({
        zipCode: z.string().min(8, 'CEP inválido'),
        street: z.string().min(3, 'Endereço é obrigatório'),
        number: z.string().min(1, 'Número é obrigatório'),
        complement: z.string().optional(),
        neighborhood: z.string().min(2, 'Bairro é obrigatório'),
        city: z.string().min(2, 'Cidade é obrigatória'),
        state: z.string().length(2, 'Estado deve ter 2 letras'),
      }),
    });

    type EditClientFormData = z.infer<typeof editClientSchema>;

    interface EditClientModalProps {
      isOpen: boolean;
      onClose: () => void;
      client: Client;
    }

    export function EditClientModal({ isOpen, onClose, client }: EditClientModalProps) {
      const updateClient = useClientsStore((state) => state.updateClient);
      const { toast } = useToast();

      const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
      } = useForm<EditClientFormData>({
        resolver: zodResolver(editClientSchema),
        defaultValues: {
          ...client,
        },
      });

      const formatPhone = (value: string) => {
        return value
          .replace(/\D/g, '')
          .replace(/^(\d{2})(\d)/g, '($1) $2')
          .replace(/(\d)(\d{4})$/, '$1-$2');
      };

      const formatDocument = (value: string, type: 'individual' | 'company') => {
        const numbers = value.replace(/\D/g, '');
        
        if (type === 'individual') {
          return numbers
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else {
          return numbers
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
        }
      };

      const formatCep = (value: string) => {
        return value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
      };

      const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value);
        e.target.value = formatted;
      };

      const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const type = watch('type');
        const formatted = formatDocument(e.target.value, type);
        e.target.value = formatted;
      };

      const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const cep = e.target.value.replace(/\D/g, '');
        
        if (cep.length === 8) {
          try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            if (!data.erro) {
              setValue('address.street', data.logradouro);
              setValue('address.neighborhood', data.bairro);
              setValue('address.city', data.localidade);
              setValue('address.state', data.uf);
            }
          } catch (error) {
            console.error('Error fetching address:', error);
          }
        }
      };

      const handleFormSubmit = async (data: EditClientFormData) => {
        try {
          updateClient(client.id, data);
          onClose();
          toast({
            title: 'Cliente atualizado com sucesso!',
            description: 'As informações do cliente foram atualizadas.',
            type: 'success'
          });
        } catch (error) {
          console.error('Error updating client:', error);
          toast({
            title: 'Erro ao atualizar cliente',
            description: 'Por favor, tente novamente.',
            type: 'error'
          });
        }
      };

      if (!isOpen) return null;

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold">Editar Cliente</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <Input {...register('name')} error={errors.name?.message} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input type="email" {...register('email')} error={errors.email?.message} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Telefone</label>
                  <Input 
                    {...register('phone')} 
                    onChange={handlePhoneChange}
                    error={errors.phone?.message} 
                    placeholder="(99) 99999-9999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CPF/CNPJ</label>
                  <Input 
                    {...register('document')} 
                    onChange={handleDocumentChange}
                    error={errors.document?.message} 
                    placeholder={watch('type') === 'individual' ? '999.999.999-99' : '99.999.999/9999-99'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo</label>
                  <Select {...register('type')} error={errors.type?.message}>
                    <option value="individual">Pessoa Física</option>
                    <option value="company">Pessoa Jurídica</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <Select {...register('status')} error={errors.status?.message}>
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Categoria</label>
                  <Select {...register('category')} error={errors.category?.message}>
                    <option value="">Selecione uma categoria</option>
                    <option value="retail">Varejo</option>
                    <option value="wholesale">Atacado</option>
                    <option value="partner">Parceiro</option>
                    <option value="supplier">Fornecedor</option>
                  </Select>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-medium mb-4">Endereço</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">CEP</label>
                    <Input 
                      {...register('address.zipCode')}
                      onChange={(e) => {
                        const formatted = formatCep(e.target.value);
                        e.target.value = formatted;
                        handleCepChange(e);
                      }}
                      error={errors.address?.zipCode?.message}
                      placeholder="99999-999"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Logradouro</label>
                    <Input {...register('address.street')} error={errors.address?.street?.message} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Número</label>
                    <Input {...register('address.number')} error={errors.address?.number?.message} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Complemento</label>
                    <Input {...register('address.complement')} error={errors.address?.complement?.message} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Bairro</label>
                    <Input {...register('address.neighborhood')} error={errors.address?.neighborhood?.message} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Cidade</label>
                    <Input {...register('address.city')} error={errors.address?.city?.message} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Estado</label>
                    <Input 
                      {...register('address.state')} 
                      error={errors.address?.state?.message}
                      maxLength={2}
                      style={{ textTransform: 'uppercase' }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </div>
        </div>
      );
    }
