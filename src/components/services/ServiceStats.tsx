import React from 'react';
import { Package, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { StatCard } from '../financial/overview/StatCard';
import { useServicesStore } from '../../store/services';

export function ServiceStats() {
  const services = useServicesStore((state) => state.services);
  
  const activeServices = services.filter(service => service.active);
  const inactiveServices = services.filter(service => !service.active);
  const totalRevenue = services.reduce((acc, service) => acc + service.price, 0);

  const stats = [
    {
      title: 'TOTAL DE SERVIÇOS',
      value: services.length.toString(),
      icon: Package,
      description: 'Total de serviços cadastrados',
      className: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      title: 'SERVIÇOS ATIVOS',
      value: activeServices.length.toString(),
      icon: CheckCircle,
      description: 'Serviços atualmente ativos',
      className: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      title: 'SERVIÇOS INATIVOS',
      value: inactiveServices.length.toString(),
      icon: XCircle,
      description: 'Serviços atualmente inativos',
      className: 'bg-gradient-to-br from-red-500 to-red-600'
    },
    {
      title: 'RECEITA POTENCIAL',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(totalRevenue),
      icon: DollarSign,
      description: 'Soma dos valores dos serviços',
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
