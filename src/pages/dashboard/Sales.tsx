import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SalesOverview } from '../../components/sales/overview/SalesOverview';
import { TransactionsList } from '../../components/sales/transactions/TransactionsList';

export function Sales() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Vendas" 
        description="Gerencie suas vendas e acompanhe seus indicadores comerciais"
      />
      <SalesOverview />
      <TransactionsList />
    </div>
  );
}
