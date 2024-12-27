import React from 'react';
import { StatsCards } from './StatsCards';
import { OverviewFilters } from './OverviewFilters';

export function ClientsOverview() {
  return (
    <div className="space-y-4">
      <OverviewFilters />
      <StatsCards />
    </div>
  );
}
