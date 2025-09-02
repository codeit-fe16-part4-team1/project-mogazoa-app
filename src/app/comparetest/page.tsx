'use client';

import { useState, useEffect } from 'react';
import { getProductsAPI } from '@/api/products/getProductsAPI';
import { ProductItem } from '@/types/api';
import CompareBar from '@/components/CompareBar/CompareBar';
import CompareImage from '@/components/CompareImage/CompareImage';
import CompareDetail from '@/components/CompareDetail/CompareDetail';
import CompareCard from '@/components/CompareCard/CompareCard';
import CompareDetailDefault from '@/components/CompareDetail/CompareDetailDefault';
import { useQuery } from '@tanstack/react-query';

const fetchAllProducts = async () => {
  let allItems: ProductItem[] = [];
  let cursor: number | null = null;
  let hasMore = true;
  while (hasMore) {
    const { list, nextCursor } = await getProductsAPI({
      order: 'recent',
      cursor: cursor === null ? undefined : cursor,
    });
    allItems = [...allItems, ...list];
    if (nextCursor === null) {
      hasMore = false;
    }
    cursor = nextCursor;
  }
  return allItems;
};

const CompareTestPage = () => {
  const {
    data: allProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['allProducts'],
    queryFn: fetchAllProducts,
  });

  const [selectedProductA, setSelectedProductA] = useState<ProductItem | null>(null);
  const [selectedProductB, setSelectedProductB] = useState<ProductItem | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  useEffect(() => {
    if (allProducts) {
      console.log('불러온 전체 상품 리스트:', allProducts);
      console.log('상품 총 개수:', allProducts.length);
    }
  }, [allProducts]);

  if (isLoading || !allProducts) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const handleProductSelect = (product: ProductItem, position: 'A' | 'B') => {
    if (position === 'A') {
      setSelectedProductA(product);
    } else {
      setSelectedProductB(product);
    }
    setIsComparing(false);
  };

  const handleProductRemove = (position: 'A' | 'B') => {
    if (position === 'A') {
      setSelectedProductA(null);
    } else {
      setSelectedProductB(null);
    }
    setIsComparing(false);
  };

  const handleCompareClick = () => {
    setIsComparing(true);
  };

  const handleResetClick = () => {
    setSelectedProductA(null);
    setSelectedProductB(null);
    setIsComparing(false);
  };

  // isComparing이 true일 때만 비교 로직을 실행하도록 수정
  const isRatingAWinner =
    isComparing && selectedProductA && selectedProductB
      ? selectedProductA.rating > selectedProductB.rating
      : undefined;
  const isReviewAWinner =
    isComparing && selectedProductA && selectedProductB
      ? selectedProductA.reviewCount > selectedProductB.reviewCount
      : undefined;
  const isFavoriteAWinner =
    isComparing && selectedProductA && selectedProductB
      ? selectedProductA.favoriteCount > selectedProductB.favoriteCount
      : undefined;

  const isRatingBWinner =
    isComparing && selectedProductA && selectedProductB
      ? selectedProductB.rating > selectedProductA.rating
      : undefined;
  const isReviewBWinner =
    isComparing && selectedProductA && selectedProductB
      ? selectedProductB.reviewCount > selectedProductA.reviewCount
      : undefined;
  const isFavoriteBWinner =
    isComparing && selectedProductA && selectedProductB
      ? selectedProductB.favoriteCount > selectedProductA.favoriteCount
      : undefined;

  const bothProductsSelected = selectedProductA !== null && selectedProductB !== null;

  return (
    <div className='flex min-h-screen flex-col items-center bg-gray-100 p-8'>
      <h1 className='text-h1-bold mb-4'>Compare Test Page</h1>

      {/* PC 레이아웃 (md 이상) */}
      <div className='hidden flex-col gap-8 md:flex md:flex-row'>
        <CompareCard
          products={allProducts}
          selectedProduct={selectedProductA}
          label='A'
          onSelectProduct={(p) => handleProductSelect(p, 'A')}
          onRemoveProduct={() => handleProductRemove('A')}
          isComparing={isComparing}
          isRatingWinner={isRatingAWinner}
          isReviewCountWinner={isReviewAWinner}
          isFavoriteCountWinner={isFavoriteAWinner}
        />
        <CompareCard
          products={allProducts}
          selectedProduct={selectedProductB}
          label='B'
          onSelectProduct={(p) => handleProductSelect(p, 'B')}
          onRemoveProduct={() => handleProductRemove('B')}
          isComparing={isComparing}
          isRatingWinner={isRatingBWinner}
          isReviewCountWinner={isReviewBWinner}
          isFavoriteCountWinner={isFavoriteBWinner}
        />
      </div>

      {/* 모바일 레이아웃 (md 미만) */}
      <div className='md:hidden'>
        {/* 이미지 영역 */}
        <div className='mb-4 flex gap-4'>
          <CompareImage
            productName={selectedProductA?.name || 'A'}
            imageUrl={selectedProductA?.image || ''}
          />
          <div className='text-body1-bold flex items-center justify-center'>VS</div>
          <CompareImage
            productName={selectedProductB?.name || 'B'}
            imageUrl={selectedProductB?.image || ''}
          />
        </div>

        {/* 입력창 또는 상세정보 */}
        {isComparing ? (
          <>
            {selectedProductA ? (
              <CompareDetail
                rating={selectedProductA.rating}
                reviewCount={selectedProductA.reviewCount}
                favoriteCount={selectedProductA.favoriteCount}
                isRatingWinner={isRatingAWinner}
                isReviewCountWinner={isReviewAWinner}
                isFavoriteCountWinner={isFavoriteAWinner}
              />
            ) : (
              <CompareDetailDefault placeholder='A' />
            )}
            {selectedProductB ? (
              <CompareDetail
                rating={selectedProductB.rating}
                reviewCount={selectedProductB.reviewCount}
                favoriteCount={selectedProductB.favoriteCount}
                isRatingWinner={isRatingBWinner}
                isReviewCountWinner={isReviewBWinner}
                isFavoriteCountWinner={isFavoriteBWinner}
              />
            ) : (
              <CompareDetailDefault placeholder='B' />
            )}
          </>
        ) : (
          <div className='flex flex-col gap-4'>
            <CompareBar
              products={allProducts}
              onSelectProduct={(p) => handleProductSelect(p, 'A')}
              onRemoveProduct={() => handleProductRemove('A')}
            />
            <CompareBar
              products={allProducts}
              onSelectProduct={(p) => handleProductSelect(p, 'B')}
              onRemoveProduct={() => handleProductRemove('B')}
            />
          </div>
        )}
      </div>

      {/* 비교하기/다시 비교하기 버튼 */}
      {isComparing ? (
        <button
          onClick={handleResetClick}
          className='bg-primary-orange-600 mt-8 rounded-full px-6 py-3 text-lg font-bold text-white'
        >
          다시 비교하기
        </button>
      ) : (
        <button
          onClick={handleCompareClick}
          disabled={!bothProductsSelected}
          className={`mt-8 rounded-full px-6 py-3 text-lg font-bold text-white transition-colors duration-200 ${bothProductsSelected ? 'bg-primary-orange-600' : 'cursor-not-allowed bg-gray-400'}`}
        >
          상품 비교하기
        </button>
      )}
    </div>
  );
};

export default CompareTestPage;
