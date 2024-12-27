import React from 'react';
    import { useForm } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import { z } from 'zod';
    import { Input } from '../../ui/Input';
    import { Select } from '../../ui/Select';
    import { Button } from '../../ui/Button';
    import { PaymentServiceModal } from './PaymentServiceModal';
    import { useFinancialStore } from '../../../store/financial';
    import { addMonths, format } from 'date-fns';
    import { useClientsStore } from '../../../store/clients';
    import { useToast } from '../../ui/use-toast';
    import { useAccountsStore } from '../../../store/accounts';
    import { useServicesStore } from '../../../store/services';

    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

    const clientSchema = z.object({
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

    type ClientFormData = z.infer<typeof clientSchema>;

    interface ClientFormProps {
      onSubmit: (data: ClientFormData) => void;
      isLoading?: boolean;
    }

    export function ClientForm({ onSubmit, isLoading }: ClientFormProps) {
      const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false);
      const [clientData, setClientData] = React.useState<any>(null);
      const addManyTransactions = useFinancialStore((state) => state.addManyTransactions);
      const addClient = useClientsStore((state) => state.addClient);
      const { toast } = useToast();
      const accounts = useAccountsStore((state) => state.accounts);
      const services = useServicesStore((state) => state.services);

      const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        reset
      } = useForm<ClientFormData>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
          status: 'active',
          type: 'individual',
        }
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

      const handleDocumentChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const type = watch('type');
        const formatted = formatDocument(e.target.value, type);
        e.target.value = formatted;
        setValue('document', formatted);

        if (type === 'company' && formatted.replace(/\D/g, '').length === 14) {
          try {
            const cnpj = formatted.replace(/\D/g, '');
            const response = await fetch(`https://open.cnpja.com/office/${cnpj}`);
            const data = await response.json();

            if (data && data.company) {
              setValue('name', data.company.name);
              setValue('address.street', data.address.street);
              setValue('address.neighborhood', data.address.neighborhood);
              setValue('address.city', data.address.city);
              setValue('address.state', data.address.state);
              setValue('address.zipCode', data.address.zipcode);
              setValue('phone', data.phone);
            } else {
              toast({
                title: 'CNPJ não encontrado',
                description: 'Não foi possível obter os dados da Receita Federal para este CNPJ.',
                type: 'error'
              });
            }
          } catch (error) {
            console.error('Error fetching CNPJ data:', error);
            toast({
              title: 'Erro ao buscar dados do CNPJ',
              description: 'Ocorreu um erro ao buscar os dados da Receita Federal.',
              type: 'error'
            });
          }
        }
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

      const handleFormSubmit = async (data: ClientFormData) => {
        setClientData(data);
        setIsPaymentModalOpen(true);
      };

      const handlePaymentSubmit = (paymentData: any) => {
        const transactions = generateTransactions(clientData, paymentData);
        addManyTransactions(transactions);
        addClient({
          ...clientData,
          payment: paymentData,
        });
        
        reset();
        setIsPaymentModalOpen(false);
        setClientData(null);
        toast({
          title: 'Cliente cadastrado com sucesso!',
          description: 'O cliente foi adicionado à sua lista.',
          type: 'success'
        });
      };

      const generateTransactions = (client: any, payment: any) => {
        const transactions: any[] = [];
        const totalAmount = payment.services.reduce((acc: number, service: any) => {
          return acc + (service.price * service.quantity - service.discount);
        }, 0);
        
        const installmentAmount = totalAmount / payment.installments;

        if (payment.paymentType === 'one-time') {
          for (let i = 0; i < payment.installments; i++) {
            const dueDate = addMonths(new Date(payment.firstPaymentDate), i);
            
            transactions.push({
              clientId: client.id,
              clientName: client.name,
              type: 'income',
              category: 'service',
              description: `Serviços - Parcela ${i + 1}/${payment.installments}`,
              amount: installmentAmount,
              dueDate: format(dueDate, 'yyyy-MM-dd'),
              status: 'pending',
              paymentMethod: payment.paymentMethod,
              installmentNumber: i + 1,
              totalInstallments: payment.installments,
            });
          }
        } else {
          const totalMonths = payment.recurrenceMonths || 12;
          
          for (let i = 0; i < totalMonths; i++) {
            const dueDate = addMonths(new Date(payment.firstPaymentDate), i);
            
            transactions.push({
              clientId: client.id,
              clientName: client.name,
              type: 'income',
              category: 'service',
              description: `Serviços Recorrentes - Mês ${i + 1}`,
              amount: totalAmount,
              dueDate: format(dueDate, 'yyyy-MM-dd'),
              status: 'pending',
              paymentMethod: payment.paymentMethod,
              installmentNumber: i + 1,
              totalInstallments: totalMonths,
            });
          }
        }

        return transactions;
      };

      return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <Input {...register('name')} error={errors.name?.message} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input type="email" {...register('email')} error={errors.email?.message} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium mb-4">Endereço</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Número</label>
                <Input {...register('address.number')} error={errors.address?.number?.message} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Complemento</label>
                <Input {...register('address.complement')} error={errors.address?.complement?.message} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
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

          <div className="flex justify-end">
            <Button type="submit" isLoading={isLoading}>
              Cadastrar Cliente
            </Button>
          </div>

          {isPaymentModalOpen && clientData && (
            <PaymentServiceModal
              isOpen={isPaymentModalOpen}
              onClose={() => setIsPaymentModalOpen(false)}
              onSubmit={handlePaymentSubmit}
              clientName={clientData.name}
            />
          )}
        </form>
      );
    }
