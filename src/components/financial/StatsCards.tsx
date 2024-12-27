import React from 'react';
import { Package, DollarSign, PiggyBank, Wallet } from 'lucide-react';
import { StatCard } from './StatCard';

export function StatsCards() {
  const stats = [
    {
      title: 'QUANTIDADE',
      value: '0.00 und',
      icon: Package,
      description: 'Total de unidades vendidas'
    },
    {
      title: 'RECEITA',
      value: 'R$ 0,00',
      icon: DollarSign,
      description: 'Receita total'
    },
    {
      title: 'RECEBIDO',
      value: 'R$ 0,00',
      icon: PiggyBank,
      description: 'Valor total recebido'
    },
    {
      title: 'A RECEBER',
      value: 'R$ 0,00',
      icon: Wallet,
      description: 'Valor total a receber'
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
