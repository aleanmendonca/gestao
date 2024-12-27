import React from 'react';
import { Select } from '../../ui/Select';

export function OverviewFilters() {
  return (
    <div className="flex gap-4">
      <Select defaultValue="all">
        <option value="all">Todos os Status</option>
        <option value="active">Ativos</option>
        <option value="inactive">Inativos</option>
      </Select>
      <Select defaultValue="all">
        <option value="all">Todas as Categorias</option>
        <option value="retail">Varejo</option>
        <option value="wholesale">Atacado</option>
      </Select>
    </div>
  );
}
