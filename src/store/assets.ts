import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Asset {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  category: string;
  status: 'available' | 'maintenance' | 'unavailable';
  brand?: string;
  invoiceNumber?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

interface AssetsState {
  assets: Asset[];
  addAsset: (asset: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAsset: (id: string, asset: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
}

export const useAssetsStore = create<AssetsState>()(
  persist(
    (set) => ({
      assets: [],
      
      addAsset: (assetData) => set((state) => ({
        assets: [...state.assets, {
          ...assetData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }],
      })),
      
      updateAsset: (id, updatedData) => set((state) => ({
        assets: state.assets.map((asset) =>
          asset.id === id
            ? { ...asset, ...updatedData, updatedAt: new Date().toISOString() }
            : asset
        ),
      })),
      
      deleteAsset: (id) => set((state) => ({
        assets: state.assets.filter((asset) => asset.id !== id),
      })),
    }),
    {
      name: 'assets-storage',
    }
  )
);
