'use client';

import React, { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import { ProductItem } from '@/types/api';

interface CompareContextType {
  products: ProductItem[];
  addProduct: (
    product: ProductItem,
    openReplaceModal: (onReplace: (replaceProductId: number) => void) => void,
  ) => void;
  removeProduct: (productId: number) => void;
  resetProducts: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const STORAGE_KEY = 'compareProducts';

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const isInitialized = useRef(false);

  useEffect(() => {
    try {
      if (!isInitialized.current) {
        const storedProducts = localStorage.getItem(STORAGE_KEY);
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        }
        isInitialized.current = true;
      }
    } catch (e) {
      console.error('localStorage에서 상품을 로드하지 못했습니다.', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  const addProduct = (
    product: ProductItem,
    openReplaceModal: (onReplace: (replaceProductId: number) => void) => void,
  ) => {
    setProducts((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev;
      }
      if (prev.length < 2) {
        return [...prev, product];
      }
      openReplaceModal((replaceProductId: number) => {
        setProducts([...prev.filter((p) => p.id !== replaceProductId), product]);
      });
      return prev;
    });
  };

  const removeProduct = (productId: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const resetProducts = () => {
    setProducts([]);
  };

  const value = { products, addProduct, removeProduct, resetProducts };

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
};

export const useCompareProducts = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('CompareProvider 내에서 사용되어야 합니다.');
  }
  return context;
};
