import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

const assetSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  quantity: z.number().min(1, 'Quantidade deve ser maior que zero'),
  unitPrice: z.number().min(0.01, 'Preço deve ser maior que zero'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  brand: z.string().optional(),
  invoiceNumber: z.string().optional(),
  assignedTo: z.string().optional(),
});

type AssetFormData = z.infer<typeof assetSchema>;

interface AssetFormProps {
  onSubmit: (data: AssetFormData) => void;
  isLoading?: boolean;
}

export function AssetForm({ onSubmit, isLoading }: AssetFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Nome do Ativo</label>
        <Input {...register('name')} error={errors.name?.message} />
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Quantidade</label>
          <Input type="number" {...register('quantity', { valueAsNumber: true })} error={errors.quantity?.message} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Preço Unitário</label>
          <Input type="number" step="0.01" {...register('unitPrice', { valueAsNumber: true })} error={errors.unitPrice?.message} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Categoria</label>
          <Input {...register('category')} error={errors.category?.message} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Marca</label>
          <Input {...register('brand')} error={errors.brand?.message} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nota Fiscal</label>
          <Input {...register('invoiceNumber')} error={errors.invoiceNumber?.message} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Atribuído a</label>
        <Input {...register('assignedTo')} error={errors.assignedTo?.message} />
      </div>
      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          Salvar Ativo
        </Button>
      </div>
    </form>
  );
}
