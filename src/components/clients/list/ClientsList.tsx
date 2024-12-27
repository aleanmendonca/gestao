import React from 'react';
import { ClientsHeader } from './ClientsHeader';
import { ClientsTable } from './ClientsTable';
import { ClientsPagination } from './ClientsPagination';

export function ClientsList() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <ClientsHeader />
      <ClientsTable />
      <ClientsPagination />
    </div>
  );
}
