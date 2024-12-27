import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { FinancialOverview } from '../../components/financial/overview/FinancialOverview';
import { TransactionsList } from '../../components/financial/transactions/TransactionsList';

export function Financial() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Financeiro" 
        description="Gerencie suas transações e acompanhe seus indicadores financeiros"
      />
      <FinancialOverview />
      <TransactionsList />
    </div>
  );
}
