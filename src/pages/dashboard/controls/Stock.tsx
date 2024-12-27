import React from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { AssetForm } from '../../../components/stock/AssetForm';
import { AssetList } from '../../../components/stock/AssetList';
import { AssetStats } from '../../../components/stock/AssetStats';
import { useAssetsStore } from '../../../store/assets';

export function Stock() {
  const addAsset = useAssetsStore((state) => state.addAsset);

  const handleSubmit = (data: any) => {
    try {
      addAsset(data);
      alert('Ativo cadastrado com sucesso!');
    } catch (error) {
      console.error('Error adding asset:', error);
      alert('Erro ao cadastrar ativo. Por favor, tente novamente.');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Estoque" 
        description="Gerencie seus ativos e produtos"
      />
      
      <AssetStats />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-6">Novo Ativo</h2>
        <AssetForm onSubmit={handleSubmit} />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Ativos Cadastrados</h2>
        <AssetList />
      </div>
    </div>
  );
}
