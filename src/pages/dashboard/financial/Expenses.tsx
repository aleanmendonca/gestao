import React from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { ExpenseList } from '../../../components/financial/expenses/ExpenseList';
import { ExpenseStats } from '../../../components/financial/expenses/ExpenseStats';

export function Expenses() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Saídas" 
        description="Gerencie suas despesas e controle os gastos"
      />
      <ExpenseStats />
      <ExpenseList />
    </div>
  );
}
