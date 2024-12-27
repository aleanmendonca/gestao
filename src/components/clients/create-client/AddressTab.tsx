import React from 'react';
import { Input } from '../../ui/Input';

interface AddressTabProps {
  data: any;
  onChange: (data: any) => void;
}

export function AddressTab({ data, onChange }: AddressTabProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ address: { ...data.address, [e.target.name]: e.target.value } });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">CEP</label>
          <Input
            name="zipCode"
            value={data.address?.zipCode || ''}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Endereço</label>
        <Input
          name="street"
          value={data.address?.street || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Número</label>
          <Input
            name="number"
            value={data.address?.number || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Complemento</label>
          <Input
            name="complement"
            value={data.address?.complement || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Bairro</label>
          <Input
            name="neighborhood"
            value={data.address?.neighborhood || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cidade</label>
          <Input
            name="city"
            value={data.address?.city || ''}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Estado</label>
        <Input
          name="state"
          value={data.address?.state || ''}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
}
