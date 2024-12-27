import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useServicesStore } from '../../store/services';

const serviceSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  price: z.number().min(0.01, 'Preço deve ser maior que zero'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  duration: z.number().optional(),
  recurrent: z.boolean(),
  billingCycle: z.enum(['monthly', 'quarterly', 'semiannual', 'annual']).optional(),
  active: z.boolean(),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  onSubmit: (data: ServiceFormData) => void;
  isLoading?: boolean;
}

export function ServiceForm({ onSubmit, isLoading }: ServiceFormProps) {
  const categories = useServicesStore((state) => state.categories);
  const addCategory = useServicesStore((state) => state.addCategory);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      active: true,
      recurrent: false,
    },
  });

  const isRecurrent = watch('recurrent');
  const [newCategory, setNewCategory] = React.useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Nome do Serviço</label>
          <Input {...register('name')} error={errors.name?.message} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Categoria</label>
          <div className="flex gap-2">
            <Select {...register('category')} error={errors.category?.message}>
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>
            <div className="flex gap-2">
              <Input
                placeholder="Nova categoria"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <Button type="button" onClick={handleAddCategory} size="sm">
                Adicionar
              </Button>
            </div>
          </div>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Preço</label>
          <Input
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            error={errors.price?.message}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Duração (minutos)</label>
          <Input
            type="number"
            {...register('duration', { valueAsNumber: true })}
            error={errors.duration?.message}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select {...register('active')}>
            <option value={true}>Ativo</option>
            <option value={false}>Inativo</option>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('recurrent')}
            className="rounded border-gray-300"
          />
          <label className="text-sm font-medium">Serviço Recorrente</label>
        </div>

        {isRecurrent && (
          <div>
            <label className="block text-sm font-medium mb-1">Ciclo de Cobrança</label>
            <Select {...register('billingCycle')} error={errors.billingCycle?.message}>
              <option value="monthly">Mensal</option>
              <option value="quarterly">Trimestral</option>
              <option value="semiannual">Semestral</option>
              <option value="annual">Anual</option>
            </Select>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          Salvar Serviço
        </Button>
      </div>
    </form>
  );
}
