import React from 'react';
    import { X } from 'lucide-react';
    import { Button } from '../ui/Button';
    import { Input } from '../ui/Input';
    import { Select } from '../ui/Select';
    import { useForm } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import { z } from 'zod';
    import { useUserStore } from '../../store/user';
    import { useToast } from '../ui/use-toast';

    const addUserSchema = z.object({
      name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
      email: z.string().email('Email inválido'),
      role: z.enum(['admin', 'employee']),
    });

    type AddUserFormData = z.infer<typeof addUserSchema>;

    interface AddUserModalProps {
      isOpen: boolean;
      onClose: () => void;
    }

    export function AddUserModal({ isOpen, onClose }: AddUserModalProps) {
      const { addUser } = useUserStore();
      const { toast } = useToast();

      const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm<AddUserFormData>({
        resolver: zodResolver(addUserSchema),
      });

      const handleFormSubmit = async (data: AddUserFormData) => {
        try {
          addUser(data);
          reset();
          onClose();
          toast({
            title: 'Usuário adicionado com sucesso!',
            description: 'O usuário foi adicionado à sua lista.',
            type: 'success'
          });
        } catch (error) {
          console.error('Error adding user:', error);
          toast({
            title: 'Erro ao adicionar usuário',
            description: 'Por favor, tente novamente.',
            type: 'error'
          });
        }
      };

      if (!isOpen) return null;

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold">Adicionar Usuário</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <Input {...register('name')} error={errors.name?.message} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input type="email" {...register('email')} error={errors.email?.message} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <Select {...register('role')} error={errors.role?.message}>
                  <option value="admin">Administrador</option>
                  <option value="employee">Funcionário</option>
                </Select>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Adicionar Usuário
                </Button>
              </div>
            </form>
          </div>
        </div>
      );
    }
