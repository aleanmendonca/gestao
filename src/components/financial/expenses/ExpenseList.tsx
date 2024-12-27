import React from 'react';
import { Button } from '../../ui/Button';
import { Plus } from 'lucide-react';
import { CreateExpenseModal } from './CreateExpenseModal';

export function ExpenseList() {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Adicionar Saída
        </Button>
      </div>

      <div className="p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              <th className="p-2">Data</th>
              <th className="p-2">Descrição</th>
              <th className="p-2">Categoria</th>
              <th className="p-2">Valor</th>
              <th className="p-2">Status</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                Nenhum resultado encontrado
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <CreateExpenseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
