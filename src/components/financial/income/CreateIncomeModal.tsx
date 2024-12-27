import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';

const incomeSchema = z.object({
  description: z.string().min(3, 'Descrição é obrigatória'),
  amount: z.number().min(0.01, 'Valor deve ser maior que zero'),
  date: z.string(),
  category: z.string().min(1, 'Categoria é obrigatória'),
  paymentMethod: z.string().min(1, 'Método de pagamento é obrigatório'),
  status: z.string().min(1, 'Status é obrigatório'),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
  clientId: z.string().optional(),
  documentNumber: z.string().optional(),
});

type IncomeForm = z.infer<typeof incomeSchema>;

interface CreateIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IncomeForm) => Promise<void>;
}

export function CreateIncomeModal({ isOpen, onClose, onSubmit }: CreateIncomeModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<IncomeForm>({
    resolver: zodResolver(incomeSchema)
  });

  const handleFormSubmit = async (data: IncomeForm) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating income:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Nova Entrada</h2>
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
                  <option value="sale">Venda</option>
                  <option value="service">Serviço</option>
                  <option value="investment">Investimento</option>
                  <option value="other">Outros</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Método de Pagamento</label>
                <Select {...register('paymentMethod')} error={errors.paymentMethod?.message}>
                  <option value="">Selecione</option>
                  <option value="cash">Dinheiro</option>
                  <option value="credit">Cartão de Crédito</option>
                  <option value="debit">Cartão de Débito</option>
                  <option value="transfer">Transferência</option>
                  <option value="pix">PIX</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select {...register('status')} error={errors.status?.message}>
                  <option value="">Selecione</option>
                  <option value="received">Recebido</option>
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
