import { create } from 'zustand';
    import { persist } from 'zustand/middleware';

    export interface Client {
      id: string;
      name: string;
      email: string;
      phone: string;
      document: string;
      type: 'individual' | 'company';
      status: 'active' | 'inactive';
      category: string;
      address: {
        zipCode: string;
        street: string;
        number: string;
        complement?: string;
        neighborhood: string;
        city: string;
        state: string;
      };
      payment?: any;
      createdAt: string;
      updatedAt: string;
    }

    interface ClientsState {
      clients: Client[];
      addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void;
      updateClient: (id: string, client: Partial<Client>) => void;
      deleteClient: (id: string) => void;
      setClients: (clients: Client[]) => void;
    }

    export const useClientsStore = create<ClientsState>()(
      persist(
        (set) => ({
          clients: [
            {
              id: 'client-1',
              name: 'João Silva',
              email: 'joao@email.com',
              phone: '(11) 99999-9999',
              document: '123.456.789-00',
              type: 'individual',
              status: 'active',
              category: 'retail',
              address: {
                zipCode: '01001-000',
                street: 'Rua Exemplo, 123',
                number: '123',
                neighborhood: 'Centro',
                city: 'São Paulo',
                state: 'SP',
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              id: 'client-2',
              name: 'Empresa ABC',
              email: 'contato@empresaabc.com',
              phone: '(11) 88888-8888',
              document: '12.345.678/0001-90',
              type: 'company',
              status: 'active',
              category: 'wholesale',
              address: {
                zipCode: '02002-000',
                street: 'Avenida Teste, 456',
                number: '456',
                neighborhood: 'Vila Nova',
                city: 'Rio de Janeiro',
                state: 'RJ',
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
          
          addClient: (clientData) => set((state) => {
            const newClient: Client = {
              ...clientData,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            
            return {
              clients: [...state.clients, newClient]
            };
          }),
          
          updateClient: (id, updatedData) => set((state) => ({
            clients: state.clients.map((client) =>
              client.id === id
                ? { ...client, ...updatedData, updatedAt: new Date().toISOString() }
                : client
            ),
          })),
          
          deleteClient: (id) => set((state) => ({
            clients: state.clients.filter((client) => client.id !== id),
          })),
          
          setClients: (clients) => set({ clients }),
        }),
        {
          name: 'clients-storage',
        }
      )
    );
