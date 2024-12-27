import React from 'react';
import { Package, CheckCircle, Hammer, AlertTriangle } from 'lucide-react';
import { StatCard } from '../financial/overview/StatCard';
import { useAssetsStore } from '../../store/assets';

export function AssetStats() {
  const { assets } = useAssetsStore();
  
  const availableAssets = assets.filter(asset => asset.status === 'available');
  const maintenanceAssets = assets.filter(asset => asset.status === 'maintenance');
  const totalValue = assets.reduce((acc, asset) => acc + asset.unitPrice * asset.quantity, 0);

  const stats = [
    {
      title: 'TOTAL DE ATIVOS',
      value: assets.length.toString(),
      icon: Package,
      description: 'Total de ativos cadastrados',
      className: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      title: 'ATIVOS DISPONÍVEIS',
      value: availableAssets.length.toString(),
      icon: CheckCircle,
      description: 'Ativos disponíveis para uso',
      className: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      title: 'EM MANUTENÇÃO',
      value: maintenanceAssets.length.toString(),
      icon: Hammer,
      description: 'Ativos em manutenção',
      className: 'bg-gradient-to-br from-yellow-500 to-yellow-600'
    },
    {
      title: 'VALOR TOTAL',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(totalValue),
      icon: AlertTriangle,
      description: 'Valor total dos ativos',
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
