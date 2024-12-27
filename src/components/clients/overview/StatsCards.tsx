import React from 'react';
import { Users, UserCheck, UserMinus, Wallet } from 'lucide-react';
import { StatCard } from './StatCard';

export function StatsCards() {
  const stats = [
    {
      title: 'TOTAL DE CLIENTES',
      value: '0',
      icon: Users,
      description: 'Total de clientes cadastrados'
    },
    {
      title: 'CLIENTES ATIVOS',
      value: '0',
      icon: UserCheck,
      description: 'Clientes atualmente ativos'
    },
    {
      title: 'CLIENTES INATIVOS',
      value: '0',
      icon: UserMinus,
      description: 'Clientes atualmente inativos'
    },
    {
      title: 'TICKET MÉDIO',
      value: 'R$ 0,00',
      icon: Wallet,
      description: 'Valor médio por cliente'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
