'use client';
import { useState } from 'react';
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

const ComparePage = () => {
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
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100'>
      <div className='flex w-85 flex-col items-center gap-10 md:w-170 md:gap-16 lg:w-[889px]'>
        <div className='font-cafe24-supermagic text-h2-bold md:text-[40px]'>
          둘 중 뭐가 더 나을까?
        </div>

        {/* PC 레이아웃 (md 이상) */}
        <div className='hidden flex-col gap-8 md:flex md:flex-row md:gap-12'>
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
          <div className='mt-20 mb-12 flex flex-col items-center justify-between'>
            <div className='font-cafe24-supermagic text-h1-bold text-gray-600'>VS</div>

            <div className='flex w-20 flex-col items-center gap-[63px]'>
              <div className='text-body2-bold text-gray-600'>⭐️별점</div>
              <div className='text-body2-bold text-gray-600'>📝 리뷰 개수</div>
              <div className='text-body2-bold text-gray-600'>🫶🏻 찜 개수</div>
            </div>
          </div>
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
        <div className='items-center md:hidden'>
          <div className='flex flex-col items-center justify-center gap-10'>
            {/* 이미지 영역 */}
            <div className='flex gap-[22px]'>
              <CompareImage
                productName={selectedProductA?.name || 'A'}
                imageUrl={selectedProductA?.image || ''}
                placeholder='A'
              />
              <div className='font-cafe24-supermagic text-h3-bold flex items-center justify-center text-gray-900'>
                VS
              </div>
              <CompareImage
                productName={selectedProductB?.name || 'B'}
                imageUrl={selectedProductB?.image || ''}
                placeholder='B'
              />
            </div>

            {/* 입력창 또는 상세정보 */}
            {isComparing ? (
              <div className='rounded-x5 flex h-60 w-[341px] items-center justify-center bg-white'>
                <div className='flex h-50 items-center justify-center gap-5'>
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
                  <div className='flex w-15 flex-col items-center gap-13 text-gray-600'>
                    <div className='text-[12px]'>⭐️별점</div>
                    <div className='text-[12px]'>📝 리뷰 개수</div>
                    <div className='text-[12px]'>🫶🏻 찜 개수</div>
                  </div>
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
                </div>
              </div>
            ) : (
              <div className='flex w-85 flex-col gap-6'>
                <div className='flex flex-col gap-2'>
                  <div className='text-body2-bold text-gray-900'>상품 A</div>
                  <CompareBar
                    products={allProducts}
                    selectedProduct={selectedProductA}
                    onSelectProduct={(p) => handleProductSelect(p, 'A')}
                    onRemoveProduct={() => handleProductRemove('A')}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='text-body2-bold text-gray-900'>상품 B</div>
                  <CompareBar
                    products={allProducts}
                    selectedProduct={selectedProductB}
                    onSelectProduct={(p) => handleProductSelect(p, 'B')}
                    onRemoveProduct={() => handleProductRemove('B')}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 비교하기/다시 비교하기 버튼 */}
        {isComparing ? (
          <button
            onClick={handleResetClick}
            className='bg-primary-orange-600 text-body1-bold h-[50px] w-85 rounded-full text-white md:h-[55px]'
          >
            다시 비교하기
          </button>
        ) : (
          <button
            onClick={handleCompareClick}
            disabled={!bothProductsSelected}
            className={`text-body1-bold h-[50px] w-85 rounded-full transition-colors duration-200 md:h-[55px] ${bothProductsSelected ? 'bg-primary-orange-600 text-white' : 'cursor-not-allowed bg-gray-200 text-gray-500'}`}
          >
            {bothProductsSelected
              ? '상품 비교하기'
              : `비교할 상품 2개를 입력해주세요 (${[selectedProductA, selectedProductB].filter(Boolean).length}/2)`}
          </button>
        )}
      </div>
    </div>
  );
};

export default ComparePage;
