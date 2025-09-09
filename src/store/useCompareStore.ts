'use client';

import { create } from 'zustand';
import { ProductItem } from '@/types/api';
import { persist } from 'zustand/middleware';

interface CompareStore {
  products: (ProductItem | null)[];
  addProduct: (product: ProductItem) => void;
  setComparisonProducts: (newProducts: ProductItem[]) => void;
  // removeProduct: (productId: number) => void;
  removeProduct: (position: 'A' | 'B') => void;
  resetProducts: () => void;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) => {
        const state = get();
        if (state.products.some((p) => p?.id === product.id)) {
          return;
        }

        const newProducts = [...state.products];
        const firstEmptyIndex = newProducts.findIndex((p) => p === null);

        if (firstEmptyIndex !== -1) {
          newProducts[firstEmptyIndex] = product;
          set({ products: newProducts });
        } else if (newProducts.length < 2) {
          set({ products: [...newProducts, product] });
        }
      },
      setComparisonProducts: (newProducts) => {
        set({ products: newProducts });
      },
      // removeProduct: (productId) => {
      //   set((state) => ({ products: state.products.filter((p) => p.id !== productId) }));
      // },
      removeProduct: (position) => {
        set((state) => {
          const newProducts = [...state.products];
          const index = position === 'A' ? 0 : 1;
          newProducts[index] = null;
          return { products: newProducts };
        });
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
