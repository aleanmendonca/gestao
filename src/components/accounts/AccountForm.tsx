import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

const accountSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  bank: z.string().min(3, 'Banco é obrigatório'),
  accountType: z.enum(['checking', 'savings', 'investment']),
  accountNumber: z.string().min(5, 'Número da conta é obrigatório'),
  agency: z.string().min(4, 'Agência é obrigatória'),
  balance: z.number().default(0),
  status: z.enum(['active', 'inactive']),
  description: z.string().optional(),
});

type AccountFormData = z.infer<typeof accountSchema>;

interface AccountFormProps {
  onSubmit: (data: AccountFormData) => void;
  isLoading?: boolean;
}

export function AccountForm({ onSubmit, isLoading }: AccountFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      status: 'active',
      balance: 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Nome da Conta</label>
          <Input {...register('name')} error={errors.name?.message} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Banco</label>
          <Input {...register('bank')} error={errors.bank?.message} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Tipo de Conta</label>
          <Select {...register('accountType')} error={errors.accountType?.message}>
            <option value="checking">Conta Corrente</option>
            <option value="savings">Poupança</option>
            <option value="investment">Investimento</option>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Agência</label>
          <Input {...register('agency')} error={errors.agency?.message} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Número da Conta</label>
          <Input {...register('accountNumber')} error={errors.accountNumber?.message} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Saldo Inicial</label>
          <Input
            type="number"
            step="0.01"
            {...register('balance', { valueAsNumber: true })}
            error={errors.balance?.message}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select {...register('status')} error={errors.status?.message}>
            <option value="active">Ativa</option>
            <option value="inactive">Inativa</option>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <textarea
          {...register('description')}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          rows={3}
        />
        {errors.description && (
          <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          Salvar Conta
        </Button>
      </div>
    </form>
  );
}
