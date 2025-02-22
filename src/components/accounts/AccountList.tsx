import React from 'react';
import { Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAccountsStore, BankAccount } from '../../store/accounts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function AccountList() {
  const { accounts, updateAccount, deleteAccount } = useAccountsStore();

  const handleToggleStatus = (account: BankAccount) => {
    updateAccount(account.id, { status: account.status === 'active' ? 'inactive' : 'active' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta conta?')) {
      deleteAccount(id);
    }
  };

  if (accounts.length === 0) {
    return (
      <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
        <p className="text-gray-500 dark:text-gray-400">
          Nenhuma conta cadastrada
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Banco
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Saldo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {accounts.map((account) => (
              <tr key={account.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {account.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Ag: {account.agency} | CC: {account.accountNumber}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {account.bank}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {account.accountType === 'checking' && 'Conta Corrente'}
                  {account.accountType === 'savings' && 'Poupança'}
                  {account.accountType === 'investment' && 'Investimento'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(account.balance)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleStatus(account)}
                    className="flex items-center text-sm"
                  >
                    {account.status === 'active' ? (
                      <>
                        <ToggleRight className="h-5 w-5 text-green-500 mr-1" />
                        <span className="text-green-500">Ativa</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="h-5 w-5 text-gray-500 mr-1" />
                        <span className="text-gray-500">Inativa</span>
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(account.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
