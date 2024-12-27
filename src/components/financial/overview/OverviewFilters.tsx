import React from 'react';
import { Select } from '../../ui/Select';

export function OverviewFilters() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="flex gap-4">
      <Select defaultValue={currentYear.toString()}>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </Select>
      <Select defaultValue="all">
        <option value="all">Todos os meses</option>
        {months.map(month => (
          <option key={month} value={month}>
            {new Date(2024, month - 1).toLocaleString('pt-BR', { month: 'long' })}
          </option>
        ))}
      </Select>
    </div>
  );
}
