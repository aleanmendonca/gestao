import React from 'react';

export function TransactionsSummary() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Resumo de Transações</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400">Entradas Recentes</span>
          <span className="text-sm font-medium text-green-600">R$ 0,00</span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400">Saídas Recentes</span>
          <span className="text-sm font-medium text-red-600">R$ 0,00</span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400">A Receber (Próx. 7 dias)</span>
          <span className="text-sm font-medium text-blue-600">R$ 0,00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">A Pagar (Próx. 7 dias)</span>
          <span className="text-sm font-medium text-orange-600">R$ 0,00</span>
        </div>
      </div>
    </div>
  );
}
