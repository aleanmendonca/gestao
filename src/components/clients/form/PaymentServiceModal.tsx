import React from 'react';
    import { X, Plus, Trash2 } from 'lucide-react';
    import { useForm, useFieldArray } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import { z } from 'zod';
    import { Button } from '../../ui/Button';
    import { Input } from '../../ui/Input';
    import { Select } from '../../ui/Select';
    import { useServicesStore } from '../../../store/services';
    import { addMonths, format } from 'date-fns';
    import { useAccountsStore } from '../../../store/accounts';

    const paymentSchema = z.object({
      services: z.array(z.object({
        serviceId: z.string().min(1, 'Serviço é obrigatório'),
        quantity: z.number().min(1, 'Quantidade deve ser maior que zero'),
        price: z.number().min(0.01, 'Preço deve ser maior que zero'),
        discount: z.number().min(0, 'Desconto não pode ser negativo'),
      })),
      paymentType: z.enum(['one-time', 'recurring']),
      paymentMethod: z.string().min(1, 'Método de pagamento é obrigatório'),
      installments: z.number().min(1, 'Número de parcelas deve ser maior que zero'),
      firstPaymentDate: z.string().min(1, 'Data do primeiro pagamento é obrigatória'),
      recurrenceMonths: z.number().optional(),
      receivingAccount: z.string().min(1, 'Conta de recebimento é obrigatória'),
    });

    type PaymentFormData = z.infer<typeof paymentSchema>;

    interface PaymentServiceModalProps {
      isOpen: boolean;
      onClose: () => void;
      onSubmit: (data: PaymentFormData) => void;
      clientName: string;
    }

    export function PaymentServiceModal({ isOpen, onClose, onSubmit, clientName }: PaymentServiceModalProps) {
      const services = useServicesStore((state) => state.services);
      const accounts = useAccountsStore((state) => state.accounts);
      
      const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
      } = useForm<PaymentFormData>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
          services: [{ serviceId: '', quantity: 1, price: 0, discount: 0 }],
          paymentType: 'one-time',
          installments: 1,
          firstPaymentDate: format(new Date(), 'yyyy-MM-dd'),
        },
      });

      const { fields, append, remove } = useFieldArray({
        control,
        name: 'services',
      });

      const paymentType = watch('paymentType');

      const handleServiceChange = (index: number, serviceId: string) => {
        const service = services.find(s => s.id === serviceId);
        if (service) {
          setValue(`services.${index}.price`, service.price);
        }
      };

      if (!isOpen) return null;

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-lg font-semibold">Adicionar Serviços e Pagamento</h2>
                <p className="text-sm text-gray-500">Cliente: {clientName}</p>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-4">
              <div className="space-y-6">
                {/* Services Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Serviços</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ serviceId: '', quantity: 1, price: 0, discount: 0 })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Serviço
                    </Button>
                  </div>

                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-start space-x-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Serviço</label>
                          <Select
                            {...register(`services.${index}.serviceId`)}
                            onChange={(e) => handleServiceChange(index, e.target.value)}
                            error={errors.services?.[index]?.serviceId?.message}
                          >
                            <option value="">Selecione um serviço</option>
                            {services.map((service) => (
                              <option key={service.id} value={service.id}>
                                {service.name}
                              </option>
                            ))}
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Quantidade</label>
                          <Input
                            type="number"
                            {...register(`services.${index}.quantity`, { valueAsNumber: true })}
                            error={errors.services?.[index]?.quantity?.message}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Preço</label>
                          <Input
                            type="number"
                            step="0.01"
                            {...register(`services.${index}.price`, { valueAsNumber: true })}
                            error={errors.services?.[index]?.price?.message}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Desconto</label>
                          <Input
                            type="number"
                            step="0.01"
                            {...register(`services.${index}.discount`, { valueAsNumber: true })}
                            error={errors.services?.[index]?.discount?.message}
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => remove(index)}
                        className="mt-6"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Payment Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Pagamento</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Tipo de Pagamento</label>
                      <Select
                        {...register('paymentType')}
                        error={errors.paymentType?.message}
                      >
                        <option value="one-time">Pagamento Único</option>
                        <option value="recurring">Pagamento Recorrente</option>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Método de Pagamento</label>
                      <Select
                        {...register('paymentMethod')}
                        error={errors.paymentMethod?.message}
                      >
                        <option value="">Selecione um método</option>
                        <option value="credit_card">Cartão de Crédito</option>
                        <option value="debit_card">Cartão de Débito</option>
                        <option value="bank_slip">Boleto</option>
                        <option value="pix">PIX</option>
                        <option value="bank_transfer">Transferência Bancária</option>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Parcelas</label>
                      <Input
                        type="number"
                        min="1"
                        {...register('installments', { valueAsNumber: true })}
                        error={errors.installments?.message}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Data do Primeiro Pagamento</label>
                      <Input
                        type="date"
                        {...register('firstPaymentDate')}
                        error={errors.firstPaymentDate?.message}
                      />
                    </div>

                    {paymentType === 'recurring' && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Recorrência (meses)</label>
                        <Input
                          type="number"
                          min="1"
                          {...register('recurrenceMonths', { valueAsNumber: true })}
                          error={errors.recurrenceMonths?.message}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Conta de Recebimento</label>
                    <Select {...register('receivingAccount')} error={errors.receivingAccount?.message}>
                      <option value="">Selecione uma conta</option>
                      {accounts.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.name} - {account.bank}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Confirmar
                </Button>
              </div>
            </form>
          </div>
        </div>
      );
    }
