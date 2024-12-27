import React from 'react';

export function TransactionsTable() {
  return (
    <div className="p-4">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm font-medium text-gray-500 dark:text-gray-400">
            <th className="p-2">ID</th>
            <th className="p-2">Data</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Cliente</th>
            <th className="p-2">Produtos</th>
            <th className="p-2">Total</th>
            <th className="p-2">Status</th>
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
  );
}
