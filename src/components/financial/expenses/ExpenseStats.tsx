import React from 'react';
import { DollarSign, TrendingDown, Calendar, AlertCircle } from 'lucide-react';
import { StatCard } from '../StatCard';

export function ExpenseStats() {
  const stats = [
    {
      title: 'TOTAL PAGO',
      value: 'R$ 0,00',
      icon: DollarSign,
      description: 'Total pago no período'
    },
    {
      title: 'A PAGAR',
      value: 'R$ 0,00',
      icon: TrendingDown,
      description: 'Valor a pagar'
    },
    {
      title: 'VENCIMENTOS',
      value: '0',
      icon: Calendar,
      description: 'Vencimentos próximos'
    },
    {
      title: 'ATRASADOS',
      value: '0',
      icon: AlertCircle,
      description: 'Pagamentos atrasados'
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
