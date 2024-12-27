import React from 'react';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';

interface PersonalInfoTabProps {
  data: any;
  onChange: (data: any) => void;
}

export function PersonalInfoTab({ data, onChange }: PersonalInfoTabProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange({ personalInfo: { ...data.personalInfo, [e.target.name]: e.target.value } });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nome Completo</label>
        <Input
          name="fullName"
          value={data.personalInfo?.fullName || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            name="email"
            value={data.personalInfo?.email || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Telefone</label>
          <Input
            type="tel"
            name="phone"
            value={data.personalInfo?.phone || ''}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">CPF/CNPJ</label>
          <Input
            name="document"
            value={data.personalInfo?.document || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Categoria</label>
          <Select
            name="category"
            value={data.personalInfo?.category || ''}
            onChange={handleChange}
          >
            <option value="">Selecione uma categoria</option>
            <option value="retail">Varejo</option>
            <option value="wholesale">Atacado</option>
          </Select>
        </div>
      </div>
    </div>
  );
}
