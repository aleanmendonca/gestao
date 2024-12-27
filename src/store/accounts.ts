import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BankAccount {
  id: string;
  name: string;
  bank: string;
  accountType: 'checking' | 'savings' | 'investment';
  accountNumber: string;
  agency: string;
  balance: number;
  status: 'active' | 'inactive';
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface AccountsState {
  accounts: BankAccount[];
  addAccount: (account: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAccount: (id: string, account: Partial<BankAccount>) => void;
  deleteAccount: (id: string) => void;
  updateBalance: (id: string, amount: number) => void;
}

export const useAccountsStore = create<AccountsState>()(
  persist(
    (set) => ({
      accounts: [],
      
      addAccount: (accountData) => set((state) => ({
        accounts: [...state.accounts, {
          ...accountData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }],
      })),
      
      updateAccount: (id, updatedData) => set((state) => ({
        accounts: state.accounts.map((account) =>
          account.id === id
            ? { ...account, ...updatedData, updatedAt: new Date().toISOString() }
            : account
        ),
      })),
      
      deleteAccount: (id) => set((state) => ({
        accounts: state.accounts.filter((account) => account.id !== id),
      })),
      
      updateBalance: (id, amount) => set((state) => ({
        accounts: state.accounts.map((account) =>
          account.id === id
            ? {
                ...account,
                balance: account.balance + amount,
                updatedAt: new Date().toISOString(),
              }
            : account
        ),
      })),
    }),
    {
      name: 'accounts-storage',
    }
  )
);
