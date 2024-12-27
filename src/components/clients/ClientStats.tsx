import React from 'react';
import { Users, UserCheck, UserMinus, Wallet } from 'lucide-react';
import { StatCard } from '../financial/overview/StatCard';
import { useClientsStore } from '../../store/clients';

export function ClientStats() {
  const clients = useClientsStore((state) => state.clients);
  
  const activeClients = clients.filter(client => client.status === 'active');
  const inactiveClients = clients.filter(client => client.status === 'inactive');

  const stats = [
    {
      title: 'TOTAL DE CLIENTES',
      value: clients.length.toString(),
      icon: Users,
      description: 'Total de clientes cadastrados',
      className: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      title: 'CLIENTES ATIVOS',
      value: activeClients.length.toString(),
      icon: UserCheck,
      description: 'Clientes atualmente ativos',
      className: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      title: 'CLIENTES INATIVOS',
      value: inactiveClients.length.toString(),
      icon: UserMinus,
      description: 'Clientes atualmente inativos',
      className: 'bg-gradient-to-br from-red-500 to-red-600'
    },
    {
      title: 'TICKET MÉDIO',
      value: 'R$ 0,00',
      icon: Wallet,
      description: 'Valor médio por cliente',
      className: 'bg-gradient-to-br from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
