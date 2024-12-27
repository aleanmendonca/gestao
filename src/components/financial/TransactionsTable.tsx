import React from 'react';
import { Button } from '../ui/Button';
import { ColumnToggle } from './ColumnToggle';
import { CreateSaleModal } from './CreateSaleModal';

export function TransactionsTable() {
  const [selectedColumns, setSelectedColumns] = React.useState<string[]>([
    'id',
    'code',
    'client',
    'saleType',
    'saleDate',
    'products',
    'payments',
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="space-x-2">
            <Button variant="outline">Excluir selecionados</Button>
            <Button onClick={() => setIsCreateModalOpen(true)}>Criar Produto</Button>
          </div>
          <ColumnToggle 
            columns={selectedColumns} 
            onChange={setSelectedColumns} 
          />
        </div>

        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                <th className="p-2">ID</th>
                <th className="p-2">Código</th>
                <th className="p-2">Cliente</th>
                <th className="p-2">Tipo de Venda</th>
                <th className="p-2">Data da Venda</th>
                <th className="p-2">Produtos</th>
                <th className="p-2">Pagamentos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Nenhum resultado encontrado
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Mostrando 0 de 0 resultados
          </div>
          <div className="space-x-2">
            <Button variant="outline" disabled>Anterior</Button>
            <Button variant="outline" disabled>Próximo</Button>
          </div>
        </div>
      </div>

      <CreateSaleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}
