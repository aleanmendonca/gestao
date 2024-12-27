import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';

const expenseSchema = z.object({
  description: z.string().min(3, 'Descrição é obrigatória'),
  amount: z.number().min(0.01, 'Valor deve ser maior que zero'),
  date: z.string(),
  category: z.string().min(1, 'Categoria é obrigatória'),
  paymentMethod: z.string().min(1, 'Método de pagamento é obrigatório'),
  status: z.string().min(1, 'Status é obrigatório'),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
  supplierId: z.string().optional(),
  documentNumber: z.string().optional(),
  costCenter: z.string().optional(),
});

type ExpenseForm = z.infer<typeof expenseSchema>;

interface CreateExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExpenseForm) => Promise<void>;
}

export function CreateExpenseModal({ isOpen, onClose, onSubmit }: CreateExpenseModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ExpenseForm>({
    resolver: zodResolver(expenseSchema)
  });

  const handleFormSubmit = async (data: ExpenseForm) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating expense:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Nova Saída</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <Input {...register('description')} error={errors.description?.message} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Valor</label>
                <Input 
                  type="number" 
                  step="0.01" 
                  {...register('amount', { valueAsNumber: true })} 
                  error={errors.amount?.message} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Data</label>
                <Input 
                  type="date" 
                  {...register('date')} 
                  error={errors.date?.message} 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Categoria</label>
                <Select {...register('category')} error={errors.category?.message}>
                  <option value="">Selecione</option>
                  <option value="supplies">Fornecedores</option>
                  <option value="utilities">Utilidades</option>
                  <option value="services">Serviços</option>
                  <option value="payroll">Folha de Pagamento</option>
                  <option value="taxes">Impostos</option>
                  <option value="rent">Aluguel</option>
                  <option value="marketing">Marketing</option>
                  <option value="other">Outros</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Centro de Custo</label>
                <Select {...register('costCenter')} error={errors.costCenter?.message}>
                  <option value="">Selecione</option>
                  <option value="administrative">Administrativo</option>
                  <option value="commercial">Comercial</option>
                  <option value="operational">Operacional</option>
                  <option value="financial">Financeiro</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select {...register('status')} error={errors.status?.message}>
                  <option value="">Selecione</option>
                  <option value="paid">Pago</option>
                  <option value="pending">Pendente</option>
                  <option value="scheduled">Agendado</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Data de Vencimento</label>
                <Input 
                  type="date" 
                  {...register('dueDate')} 
                  error={errors.dueDate?.message} 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Observações</label>
              <textarea 
                {...register('notes')}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
