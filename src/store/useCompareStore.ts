'use client';

import { create } from 'zustand';
import { ProductItem } from '@/types/api';

interface CompareStore {
  products: ProductItem[];
  addProduct: (product: ProductItem) => void;
  setComparisonProducts: (newProducts: ProductItem[]) => void;
  removeProduct: (productId: number) => void;
  resetProducts: () => void;
}

const STORAGE_KEY = 'compareProducts';

export const useCompareStore = create<CompareStore>((set, get) => ({
  products: [],
  addProduct: (product) => {
    const state = get();
    // 상품이 이미 있거나, 목록이 2개면 추가하지 않고 바로 반환
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
