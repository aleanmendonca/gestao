import React from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { IncomeList } from '../../../components/financial/income/IncomeList';
import { IncomeStats } from '../../../components/financial/income/IncomeStats';

export function Income() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Entradas" 
        description="Gerencie suas receitas e acompanhe o fluxo de entrada"
      />
      <IncomeStats />
      <IncomeList />
    </div>
  );
}
