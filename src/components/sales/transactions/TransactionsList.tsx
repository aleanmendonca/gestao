import React from 'react';
import { TransactionsHeader } from './TransactionsHeader';
import { TransactionsTable } from './TransactionsTable';
import { TransactionsPagination } from './TransactionsPagination';

export function TransactionsList() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <TransactionsHeader />
      <TransactionsTable />
      <TransactionsPagination />
    </div>
  );
}
