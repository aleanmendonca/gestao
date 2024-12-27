import React from 'react';
import { Button } from '../../ui/Button';
import { Plus } from 'lucide-react';
import { CreateIncomeModal } from '../income/CreateIncomeModal';
import { CreateExpenseModal } from '../expenses/CreateExpenseModal';

export function TransactionsHeader() {
  const [isIncomeModalOpen, setIsIncomeModalOpen] = React.useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = React.useState(false);

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={() => setIsIncomeModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-6 py-2 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          <Plus className="h-5 w-5" />
          Adicionar Entrada
        </Button>
        <Button 
          onClick={() => setIsExpenseModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 px-6 py-2 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          <Plus className="h-5 w-5" />
          Adicionar Saída
        </Button>
      </div>
      
      <CreateIncomeModal
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
      />
      
      <CreateExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
      />
    </div>
  );
}
