import React from 'react';
    import { ClientCard } from './ClientCard';
    import { useClientsStore } from '../../../store/clients';

    export function ClientList() {
      const clients = useClientsStore((state) => state.clients);

      if (clients.length === 0) {
        return (
          <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400">
              Nenhum cliente cadastrado
            </p>
          </div>
        );
      }

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      );
    }
