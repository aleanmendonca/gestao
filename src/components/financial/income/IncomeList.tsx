import React from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { CreateIncomeModal } from './CreateIncomeModal';
import { IncomeTable } from './IncomeTable';

export function IncomeList() {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [incomes, setIncomes] = React.useState<any[]>([]); // Replace with your income type

  const handleCreateIncome = async (data: any) => {
    try {
      // Here you would make your API call to save the income
      console.log('Creating income:', data);
      
      // Simulate API response
      const newIncome = {
        id: Date.now(),
        ...data,
        createdAt: new Date().toISOString()
      };

      setIncomes(prev => [...prev, newIncome]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating income:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar entradas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white gap-2"
        >
          <Plus className="h-4 w-4" />
          Nova Entrada
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <IncomeTable incomes={incomes} />
      </div>

      <CreateIncomeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateIncome}
      />
    </div>
  );
}
