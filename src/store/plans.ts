import { create } from 'zustand';
    import { persist } from 'zustand/middleware';

    export interface Plan {
      id: string;
      name: string;
      price: number;
      billingCycle: 'monthly' | 'yearly';
      features: string[];
    }

    interface PlansState {
      plans: Plan[];
      addPlan: (plan: Omit<Plan, 'id'>) => void;
      updatePlan: (id: string, plan: Partial<Plan>) => void;
      deletePlan: (id: string) => void;
    }

    export const usePlansStore = create<PlansState>()(
      persist(
        (set) => ({
          plans: [
            {
              id: 'monthly',
              name: 'Plano Mensal',
              price: 97,
              billingCycle: 'monthly',
              features: ['Acesso a todos os recursos', 'Suporte prioritário'],
            },
            {
              id: 'yearly',
              name: 'Plano Anual',
              price: 997,
              billingCycle: 'yearly',
              features: ['Acesso a todos os recursos', 'Suporte prioritário', 'Desconto exclusivo'],
            },
          ],
          addPlan: (planData) => set((state) => ({
            plans: [...state.plans, { ...planData, id: crypto.randomUUID() }],
          })),
          updatePlan: (id, updatedData) => set((state) => ({
            plans: state.plans.map((plan) =>
              plan.id === id ? { ...plan, ...updatedData } : plan
            ),
          })),
          deletePlan: (id) => set((state) => ({
            plans: state.plans.filter((plan) => plan.id !== id),
          })),
        }),
        {
          name: 'plans-storage',
        }
      )
    );
