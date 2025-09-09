'use client';

import { create } from 'zustand';
import { ProductItem } from '@/types/api';
import { persist } from 'zustand/middleware';

interface CompareStore {
  products: ProductItem[];
  addProduct: (product: ProductItem) => void;
  setComparisonProducts: (newProducts: ProductItem[]) => void;
  removeProduct: (productId: number) => void;
  resetProducts: () => void;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) => {
        const state = get();
        if (state.products.some((p) => p.id === product.id) || state.products.length >= 2) {
          return;
        }
        set({ products: [...state.products, product] });
      },
      setComparisonProducts: (newProducts) => {
        set({ products: newProducts });
      },
      removeProduct: (productId) => {
        set((state) => ({ products: state.products.filter((p) => p.id !== productId) }));
      },
      resetProducts: () => {
        set({ products: [] });
      },
    }),
    {
      name: 'compareProducts',
    },
  ),
);
