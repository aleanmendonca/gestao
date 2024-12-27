import React from 'react';
import { TrendingUp, TrendingDown, Wallet, AlertCircle } from 'lucide-react';
import { StatCard } from './StatCard';

interface StatsCardsProps {
  data: {
    totalRevenue: number;
    totalExpenses: number;
    profit: number;
    pendingReceivables: number;
    pendingPayables: number;
    cashBalance: number;
  };
}

export function StatsCards({ data }: StatsCardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const stats = [
    {
      title: 'RECEITA TOTAL',
      value: formatCurrency(data.totalRevenue),
      icon: TrendingUp,
      description: 'Total de entradas no período',
      className: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      title: 'DESPESAS TOTAIS',
      value: formatCurrency(data.totalExpenses),
      icon: TrendingDown,
      description: 'Total de saídas no período',
      className: 'bg-gradient-to-br from-red-500 to-red-600'
    },
    {
      title: 'SALDO EM CAIXA',
      value: formatCurrency(data.cashBalance),
      icon: Wallet,
      description: 'Saldo atual disponível',
      className: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      title: 'RESULTADO',
      value: formatCurrency(data.profit),
      icon: AlertCircle,
      description: 'Lucro/Prejuízo no período',
      className: `bg-gradient-to-br ${data.profit >= 0 ? 'from-emerald-500 to-emerald-600' : 'from-rose-500 to-rose-600'}`
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
