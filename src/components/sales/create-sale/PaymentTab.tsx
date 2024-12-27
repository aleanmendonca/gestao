import React from 'react';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';

interface PaymentTabProps {
  data: any;
  onChange: (data: any) => void;
}

export function PaymentTab({ data, onChange }: PaymentTabProps) {
  const payment = data.payment || {};

  const handleChange = (field: string, value: any) => {
    onChange({ payment: { ...payment, [field]: value } });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-4">Tipo de Pagamento</label>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="paymentType"
              value="cash"
              checked={payment.paymentType === 'cash'}
              onChange={(e) => handleChange('paymentType', e.target.value)}
              className="mr-2"
            />
            À vista
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="paymentType"
              value="installments"
              checked={payment.paymentType === 'installments'}
              onChange={(e) => handleChange('paymentType', e.target.value)}
              className="mr-2"
            />
            Parcelado
          </label>
        </div>
      </div>

      {payment.paymentType === 'installments' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Quantidade de Parcelas</label>
            <Input
              type="number"
              value={payment.installments || ''}
              onChange={(e) => handleChange('installments', e.target.value)}
              min="1"
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Data de Vencimento</label>
        <Input
          type="date"
          value={payment.dueDate || ''}
          onChange={(e) => handleChange('dueDate', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-4">Forma de Pagamento</label>
        <div className="space-y-2">
          {['boleto', 'pix', 'card'].map((method) => (
            <label key={method} className="flex items-center">
              <input
                type="checkbox"
                checked={payment.methods?.includes(method)}
                onChange={(e) => {
                  const methods = payment.methods || [];
                  if (e.target.checked) {
                    handleChange('methods', [...methods, method]);
                  } else {
                    handleChange('methods', methods.filter((m: string) => m !== method));
                  }
                }}
                className="mr-2"
              />
              {method === 'boleto' ? 'Boleto' : method === 'pix' ? 'PIX' : 'Cartão'}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status do Pagamento</label>
        <Select
          value={payment.status || ''}
          onChange={(e) => handleChange('status', e.target.value)}
        >
          <option value="">Selecione um status</option>
          <option value="pending">Pendente</option>
          <option value="paid">Pago</option>
          <option value="cancelled">Cancelado</option>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Valor Previsto</label>
        <Input
          type="number"
          value={payment.expectedAmount || ''}
          onChange={(e) => handleChange('expectedAmount', e.target.value)}
        />
      </div>
    </div>
  );
}
