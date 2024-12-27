import React from 'react';
import { ShoppingBag, TrendingUp, Users, DollarSign } from 'lucide-react';
import { StatCard } from './StatCard';

export function StatsCards() {
  const stats = [
    {
      title: 'TOTAL DE VENDAS',
      value: '0.00 und',
      icon: ShoppingBag,
      description: 'Total de vendas realizadas'
    },
    {
      title: 'TICKET MÉDIO',
      value: 'R$ 0,00',
      icon: TrendingUp,
      description: 'Valor médio por venda'
    },
    {
      title: 'CLIENTES ATIVOS',
      value: '0',
      icon: Users,
      description: 'Total de clientes ativos'
    },
    {
      title: 'FATURAMENTO',
      value: 'R$ 0,00',
      icon: DollarSign,
      description: 'Faturamento total'
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
