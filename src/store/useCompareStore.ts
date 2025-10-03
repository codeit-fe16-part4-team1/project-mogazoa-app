'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ProductItem } from '@/types/api';

interface CompareStore {
  products: (ProductItem | null)[];
  addProduct: (product: ProductItem) => void;
  addProductAtPosition: (product: ProductItem, position: 'A' | 'B') => void;
  setComparisonProducts: (newProducts: ProductItem[]) => void;
  removeProduct: (position: 'A' | 'B') => void;
  resetProducts: () => void;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) => {
        set((state) => {
          if (
            state.products.some((p) => p?.id === product.id) ||
            state.products.filter(Boolean).length >= 2
          ) {
            return state;
          }
          const newProducts = [...state.products];
          const firstEmptyIndex = newProducts.findIndex((p) => p === null);
          if (firstEmptyIndex !== -1) {
            newProducts[firstEmptyIndex] = product;
          } else {
            newProducts.push(product);
          }
          return { products: newProducts };
        });
      },
      addProductAtPosition: (product, position) => {
        set((state) => {
          const newProducts = [...state.products];
          const index = position === 'A' ? 0 : 1;
          newProducts[index] = product;
          return { products: newProducts };
        });
      },
      setComparisonProducts: (newProducts) => {
        set({ products: newProducts });
      },
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
