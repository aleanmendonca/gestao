import { create } from 'zustand';

export interface Transaction {
  id: string;
  clientId: string;
  clientName: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  paymentMethod: string;
  installmentNumber?: number;
  totalInstallments?: number;
  createdAt: string;
  updatedAt: string;
}

interface FinancialState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addManyTransactions: (transactions: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>[]) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}

export const useFinancialStore = create<FinancialState>((set) => ({
  transactions: [],
  addTransaction: (transactionData) => set((state) => ({
    transactions: [...state.transactions, {
      ...transactionData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }],
  })),
  addManyTransactions: (transactionsData) => set((state) => ({
    transactions: [
      ...state.transactions,
      ...transactionsData.map(transaction => ({
        ...transaction,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })),
    ],
  })),
  updateTransaction: (id, updatedData) => set((state) => ({
    transactions: state.transactions.map((transaction) =>
      transaction.id === id
        ? { ...transaction, ...updatedData, updatedAt: new Date().toISOString() }
        : transaction
    ),
  })),
  deleteTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter((transaction) => transaction.id !== id),
  })),
}));
