import React from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { AccountForm } from '../../../components/accounts/AccountForm';
import { AccountList } from '../../../components/accounts/AccountList';
import { AccountStats } from '../../../components/accounts/AccountStats';
import { useAccountsStore } from '../../../store/accounts';

export function Accounts() {
  const addAccount = useAccountsStore((state) => state.addAccount);

  const handleSubmit = (data: any) => {
    try {
      addAccount(data);
      alert('Conta cadastrada com sucesso!');
    } catch (error) {
      console.error('Error adding account:', error);
      alert('Erro ao cadastrar conta. Por favor, tente novamente.');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Contas Bancárias" 
        description="Gerencie suas contas e saldos"
      />
      
      <AccountStats />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-6">Nova Conta</h2>
        <AccountForm onSubmit={handleSubmit} />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Contas Cadastradas</h2>
        <AccountList />
      </div>
    </div>
  );
}
