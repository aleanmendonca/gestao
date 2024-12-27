import React from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { ServiceForm } from '../../../components/services/ServiceForm';
import { ServiceList } from '../../../components/services/ServiceList';
import { ServiceStats } from '../../../components/services/ServiceStats';
import { useServicesStore } from '../../../store/services';

export function RegisterServices() {
  const addService = useServicesStore((state) => state.addService);

  const handleSubmit = (data: any) => {
    try {
      addService(data);
      alert('Serviço cadastrado com sucesso!');
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Erro ao cadastrar serviço. Por favor, tente novamente.');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Serviços" 
        description="Gerencie seus serviços e produtos"
      />
      
      <ServiceStats />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-6">Novo Serviço</h2>
        <ServiceForm onSubmit={handleSubmit} />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Serviços Cadastrados</h2>
        <ServiceList />
      </div>
    </div>
  );
}
