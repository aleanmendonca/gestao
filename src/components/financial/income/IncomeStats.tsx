import React from 'react';
import { DollarSign, TrendingUp, ShoppingBag, Calendar } from 'lucide-react';
import { StatCard } from '../StatCard';

export function IncomeStats() {
  const stats = [
    {
      title: 'TOTAL RECEBIDO',
      value: 'R$ 0,00',
      icon: DollarSign,
      description: 'Total recebido no período'
    },
    {
      title: 'A RECEBER',
      value: 'R$ 0,00',
      icon: TrendingUp,
      description: 'Valor a receber'
    },
    {
      title: 'VENDAS',
      value: '0',
      icon: ShoppingBag,
      description: 'Total de vendas'
    },
    {
      title: 'VENCIMENTOS',
      value: '0',
      icon: Calendar,
      description: 'Vencimentos próximos'
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
