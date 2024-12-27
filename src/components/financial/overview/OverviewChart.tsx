import React from 'react';

interface OverviewChartProps {
  period: {
    startDate: Date;
    endDate: Date;
  };
}

export function OverviewChart({ period }: OverviewChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Fluxo de Caixa</h3>
      <div className="h-[300px] flex items-center justify-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Gráfico de entradas e saídas do período
        </div>
      </div>
    </div>
  );
}
