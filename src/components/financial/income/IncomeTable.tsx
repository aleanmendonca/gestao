import React from 'react';
import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Income {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
  status: string;
  paymentMethod: string;
}

interface IncomeTableProps {
  incomes: Income[];
}

export function IncomeTable({ incomes }: IncomeTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'received':
        return 'Recebido';
      case 'pending':
        return 'Pendente';
      case 'scheduled':
        return 'Agendado';
      default:
        return status;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
            <th className="p-4">Data</th>
            <th className="p-4">Descrição</th>
            <th className="p-4">Categoria</th>
            <th className="p-4">Valor</th>
            <th className="p-4">Status</th>
            <th className="p-4">Forma de Pagamento</th>
            <th className="p-4">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {incomes.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500 dark:text-gray-400">
                Nenhuma entrada registrada
              </td>
            </tr>
          ) : (
            incomes.map((income) => (
              <tr key={income.id} className="text-sm">
                <td className="p-4">
                  {format(new Date(income.date), 'dd/MM/yyyy')}
                </td>
                <td className="p-4">{income.description}</td>
                <td className="p-4">{income.category}</td>
                <td className="p-4 font-medium text-green-600">
                  {formatCurrency(income.amount)}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(income.status)}`}>
                    {getStatusText(income.status)}
                  </span>
                </td>
                <td className="p-4">{income.paymentMethod}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" title="Visualizar">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Editar">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Excluir">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
