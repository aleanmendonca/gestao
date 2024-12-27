import React from 'react';
import { StatsCards } from './StatsCards';
import { OverviewChart } from './OverviewChart';
import { TransactionsSummary } from './TransactionsSummary';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function FinancialOverview() {
  const [period, setPeriod] = React.useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date()
  });

  // This would be fetched from your database based on entries and exits
  const financialData = {
    totalRevenue: 0, // Sum of all entries
    totalExpenses: 0, // Sum of all exits
    profit: 0, // totalRevenue - totalExpenses
    pendingReceivables: 0, // Sum of pending entries
    pendingPayables: 0, // Sum of pending exits
    cashBalance: 0 // Current balance after all transactions
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Visão Geral - {format(period.startDate, 'MMMM yyyy', { locale: ptBR })}
        </h2>
      </div>
      
      <StatsCards data={financialData} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverviewChart period={period} />
        <TransactionsSummary />
      </div>
    </div>
  );
}
