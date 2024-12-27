import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../../ui/Button';

export function ClientsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm font-medium text-gray-500 dark:text-gray-400">
            <th className="p-4">Nome</th>
            <th className="p-4">Email</th>
            <th className="p-4">Telefone</th>
            <th className="p-4">CPF/CNPJ</th>
            <th className="p-4">Status</th>
            <th className="p-4">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          <tr className="text-sm">
            <td className="p-4">João Silva</td>
            <td className="p-4">joao@email.com</td>
            <td className="p-4">(11) 99999-9999</td>
            <td className="p-4">123.456.789-00</td>
            <td className="p-4">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Ativo
              </span>
            </td>
            <td className="p-4">
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
