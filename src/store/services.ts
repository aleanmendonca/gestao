import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  duration?: number; // in minutes
  recurrent: boolean;
  billingCycle?: 'monthly' | 'quarterly' | 'semiannual' | 'annual';
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ServicesState {
  services: Service[];
  categories: string[];
  addService: (service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
}

export const useServicesStore = create<ServicesState>()(
  persist(
    (set) => ({
      services: [],
      categories: ['Consultoria', 'Desenvolvimento', 'Suporte', 'Treinamento', 'Outros'],
      
      addService: (serviceData) => set((state) => ({
        services: [...state.services, {
          ...serviceData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }],
      })),
      
      updateService: (id, updatedData) => set((state) => ({
        services: state.services.map((service) =>
          service.id === id
            ? { ...service, ...updatedData, updatedAt: new Date().toISOString() }
            : service
        ),
      })),
      
      deleteService: (id) => set((state) => ({
        services: state.services.filter((service) => service.id !== id),
      })),
      
      addCategory: (category) => set((state) => ({
        categories: [...state.categories, category],
      })),
      
      removeCategory: (category) => set((state) => ({
        categories: state.categories.filter((c) => c !== category),
      })),
    }),
    {
      name: 'services-storage',
    }
  )
);
