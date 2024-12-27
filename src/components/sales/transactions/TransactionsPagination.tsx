import React from 'react';
import { Button } from '../../ui/Button';

export function TransactionsPagination() {
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Mostrando 0 de 0 resultados
      </div>
      <div className="space-x-2">
        <Button variant="outline" disabled>Anterior</Button>
        <Button variant="outline" disabled>Próximo</Button>
      </div>
    </div>
  );
}
