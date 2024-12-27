import React from 'react';
import { Button } from '../../ui/Button';
import { ColumnToggle } from '../ColumnToggle';
import { CreateClientModal } from '../CreateClientModal';

export function ClientsHeader() {
  const [selectedColumns, setSelectedColumns] = React.useState<string[]>([
    'name',
    'email',
    'phone',
    'document',
    'status',
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
      <div className="space-x-2">
        <Button variant="outline">Excluir selecionados</Button>
        <Button onClick={() => setIsCreateModalOpen(true)}>Novo Cliente</Button>
      </div>
      <ColumnToggle 
        columns={selectedColumns} 
        onChange={setSelectedColumns} 
      />
      
      <CreateClientModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
