'use client';

import { useState, useEffect } from 'react';
import CompareBar from '@/components/CompareBar/CompareBar';
import { getProductsAPI } from '@/api/products/getProductsAPI';
import { ProductItem } from '@/types/api';
import CompareImage from '@/components/CompareImage/CompareImage';
import CompareDetail from '@/components/CompareDetail/CompareDetail';

const CompareTestPage = () => {
  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProductA, setSelectedProductA] = useState<ProductItem | null>(null);
  const [selectedProductB, setSelectedProductB] = useState<ProductItem | null>(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        let allItems: ProductItem[] = [];
        let cursor: number | null = null;
        let hasMore = true;

        // nextCursor가 없을 때까지 API를 반복해서 호출
        while (hasMore) {
          // getProductsAPI 호출 시 cursor 값을 파라미터로 전달
          const { list, nextCursor } = await getProductsAPI({ cursor: cursor || undefined });
          allItems = [...allItems, ...list];
          if (nextCursor === null) {
            hasMore = false;
          }
          cursor = nextCursor;
        }

        setAllProducts(allItems);
      } catch (err) {
        setError('상품 목록을 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const handleProductSelect = (product: ProductItem, position: 'A' | 'B') => {
    if (position === 'A') {
      setSelectedProductA(product);
    } else {
      setSelectedProductB(product);
    }
  };

  const handleProductRemove = (product: ProductItem, position: 'A' | 'B') => {
    if (position === 'A') {
      setSelectedProductA(null);
    } else {
      setSelectedProductB(null);
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center bg-gray-100 p-8'>
      <h1 className='text-h1-bold mb-4'>CompareBar Test</h1>
      <div className='flex gap-8'>
        <div className='flex w-[340px] flex-col items-center justify-center gap-20'>
          <CompareImage
            placeholder='A'
            productName={selectedProductA?.name || '상품 A'}
            imageUrl={selectedProductA?.image || ''}
          />
          <CompareBar
            products={allProducts}
            onSelectProduct={(p) => handleProductSelect(p, 'A')}
            onRemoveProduct={(p) => handleProductRemove(p, 'A')}
          />
          <CompareDetail
            rating={selectedProductA?.rating || 0}
            reviewCount={selectedProductA?.reviewCount || 0}
            favoriteCount={selectedProductA?.favoriteCount || 0}
            isRatingWinner={false} // 우승 로직은 여기에 구현해야 합니다.
            isReviewCountWinner={true}
            isFavoriteCountWinner={true}
          />
        </div>

        <div className='flex w-[340px] flex-col items-center justify-center gap-20'>
          <CompareImage
            placeholder='B'
            productName={selectedProductB?.name || '상품 B'}
            imageUrl={selectedProductB?.image || ''}
          />
          <CompareBar
            products={allProducts}
            onSelectProduct={(p) => handleProductSelect(p, 'B')}
            onRemoveProduct={(p) => handleProductRemove(p, 'B')}
          />
          <CompareDetail
            rating={selectedProductB?.rating || 0}
            reviewCount={selectedProductB?.reviewCount || 0}
            favoriteCount={selectedProductB?.favoriteCount || 0}
            isRatingWinner={true} // 우승 로직은 여기에 구현해야 합니다.
            isReviewCountWinner={false}
            isFavoriteCountWinner={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CompareTestPage;
