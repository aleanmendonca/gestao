import React from 'react';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';

interface InfoTabProps {
  data: any;
  onChange: (data: any) => void;
}

export function InfoTab({ data, onChange }: InfoTabProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    onChange({ info: { ...data.info, [e.target.name]: e.target.value } });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nome do Cliente</label>
        <Input
          name="clientName"
          value={data.info?.clientName || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Código</label>
        <Input
          name="code"
          value={data.info?.code || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Data da Venda</label>
        <Input
          type="date"
          name="saleDate"
          value={data.info?.saleDate || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tipo da Venda</label>
        <Select
          name="saleType"
          value={data.info?.saleType || ''}
          onChange={handleChange}
        >
          <option value="">Selecione um tipo</option>
          <option value="single">Venda Avulsa</option>
          <option value="subscription">Venda por Assinatura</option>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Observação</label>
        <textarea
          name="observation"
          value={data.info?.observation || ''}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          rows={4}
        />
      </div>
    </div>
  );
}
