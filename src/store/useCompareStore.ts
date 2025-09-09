'use client';

import { create } from 'zustand';
import { ProductItem } from '@/types/api';

interface CompareStore {
  products: ProductItem[];
  addProduct: (
    product: ProductItem,
    openReplaceModal: (onReplace: (replaceProductId: number) => void) => void,
  ) => void;
  removeProduct: (productId: number) => void;
  resetProducts: () => void;
}

const STORAGE_KEY = 'compareProducts';

export const useCompareStore = create<CompareStore>((set, get) => ({
  products: [],
  addProduct: (product, openReplaceModal) => {
    const state = get();
    if (state.products.some((p) => p.id === product.id)) {
      return;
    }
    if (state.products.length < 2) {
      set({ products: [...state.products, product] });
    } else {
      openReplaceModal((replaceProductId) => {
        set({ products: [...state.products.filter((p) => p.id !== replaceProductId), product] });
      });
    }
  },
  removeProduct: (productId) => {
    set((state) => ({ products: state.products.filter((p) => p.id !== productId) }));
  },
  resetProducts: () => {
    set({ products: [] });
  },
}));

let isInitialized = false;

useCompareStore.subscribe((state) => {
  try {
    if (!isInitialized) {
      const storedProducts = localStorage.getItem(STORAGE_KEY);
      if (storedProducts) {
        useCompareStore.setState({ products: JSON.parse(storedProducts) });
      }
      isInitialized = true;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.products));
  } catch (e) {
    console.error('localStorage 동기화 오류', e);
  }
});
