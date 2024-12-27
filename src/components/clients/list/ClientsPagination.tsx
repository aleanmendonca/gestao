import React from 'react';
import { Button } from '../../ui/Button';

export function ClientsPagination() {
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Mostrando 1-10 de 20 resultados
      </div>
      <div className="space-x-2">
        <Button variant="outline">Anterior</Button>
        <Button variant="outline">Próximo</Button>
      </div>
    </div>
  );
}
