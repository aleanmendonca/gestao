import React from 'react';
import { PageHeader } from '../../../components/ui/PageHeader';
import { ClientStats } from '../../../components/clients/ClientStats';
import { ClientForm } from '../../../components/clients/form/ClientForm';
import { ClientList } from '../../../components/clients/list/ClientList';
import { useClientsStore } from '../../../store/clients';

export function Clients() {
  const addClient = useClientsStore((state) => state.addClient);

  const handleSubmit = (data: any) => {
    try {
      // Add the new client to the store
      addClient(data);
      
      // Show success message
      alert('Cliente cadastrado com sucesso!');
      
      // You could also reset the form here if needed
    } catch (error) {
      console.error('Error adding client:', error);
      alert('Erro ao cadastrar cliente. Por favor, tente novamente.');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Clientes" 
        description="Gerencie seus clientes"
      />
      
      <ClientStats />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-6">Novo Cliente</h2>
        <ClientForm onSubmit={handleSubmit} />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Clientes Cadastrados</h2>
        <ClientList />
      </div>
    </div>
  );
}
