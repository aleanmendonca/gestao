import React from 'react';
import { Wallet, CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { StatCard } from '../financial/overview/StatCard';
import { useAccountsStore } from '../../store/accounts';

export function AccountStats() {
  const accounts = useAccountsStore((state) => state.accounts);
  
  const activeAccounts = accounts.filter(account => account.status === 'active');
  const inactiveAccounts = accounts.filter(account => account.status === 'inactive');
  const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);

  const stats = [
    {
      title: 'TOTAL DE CONTAS',
      value: accounts.length.toString(),
      icon: CreditCard,
      description: 'Total de contas cadastradas',
      className: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      title: 'CONTAS ATIVAS',
      value: activeAccounts.length.toString(),
      icon: CheckCircle,
      description: 'Contas atualmente ativas',
      className: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      title: 'CONTAS INATIVAS',
      value: inactiveAccounts.length.toString(),
      icon: XCircle,
      description: 'Contas atualmente inativas',
      className: 'bg-gradient-to-br from-red-500 to-red-600'
    },
    {
      title: 'SALDO TOTAL',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(totalBalance),
      icon: Wallet,
      description: 'Soma dos saldos de todas as contas',
      className: 'bg-gradient-to-br from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
