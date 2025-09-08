'use client';

import { ProductItem } from '@/types/api';
import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'compareProducts';

export const useCompareProducts = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const isInitialized = useRef(false);

  console.log('현재 products 상태:', products);

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
      // 이미 존재하는 상품인지 확인
      if (prev.some((p) => p.id === product.id)) {
        return prev;
      }
      // 상품이 2개 미만일 때(0개 or 1개)
      if (prev.length < 2) {
        return [...prev, product];
      }

      // 목록이 2개일 때 -> 상품 교체 모달 띄우기
      openReplaceModal((replaceProductId: number) => {
        // 모달에서 교체할 상품 ID를 받아서 처리
        setProducts([...prev.filter((p) => p.id !== replaceProductId), product]);
      });

      return prev; // 모달이 닫힐 때까지 상태 변경하지 않음
    });
  };

  const removeProduct = (productId: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const resetProducts = () => {
    setProducts([]);
  };

  return { products, addProduct, removeProduct, resetProducts };
};
