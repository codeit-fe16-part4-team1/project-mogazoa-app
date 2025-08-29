'use client';
import clsx from 'clsx';
import useFilterStore from '@/store/useFilterStore';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useState, useEffect } from 'react';
import PaginationButton from '@/components/PaginationButton/PaginationButton';
import { useQuery } from '@tanstack/react-query';
import { getProductsAPI } from '@/api/products/getProductsAPI';
import { ProductItem } from '@/types/api';
import { useIsDesktop } from '@/hooks/useIsDesktop';

const setFilteredTitle = (
  category: string | null,
  query: string | null,
  hasCategory: boolean,
  hasKeyword: boolean,
) => {
  if (hasCategory && hasKeyword) {
    return `${category}의 ${query}로 검색한 상품`;
  } else if (hasCategory) {
    return `${category}의 모든 상품`;
  } else {
    return `${query}로 검색한 상품`;
  }
};

const HomeClient = () => {
  const { searchQuery, selectedCategory } = useFilterStore();
  const [currentPage, setCurrentPage] = useState(0);
  const isDesktop = useIsDesktop();

  const hasKeyword = searchQuery.trim().length > 0;
  const hasCategory = !!selectedCategory;
  const isFiltered = hasKeyword || hasCategory;
  const filteredTitle = setFilteredTitle(selectedCategory, searchQuery, hasCategory, hasKeyword);

  const SUBTITLE_STYLES = [
    'font-cafe24-supermagic',
    'text-gray-900',
    'text-h4-bold',
    'tracking-[0.4px]',
  ];

  const PRODUCT_IMAGE_LOADING_STYLES = ['mb-3', 'aspect-square', 'rounded-xl', 'bg-gray-200'];

  const {
    data: hotProductsData,
    isLoading: hotProductsLoading,
    error: hotProductsError,
  } = useQuery({
    queryKey: ['products', 'reviewCount'],
    queryFn: () => getProductsAPI({ order: 'reviewCount' }),
  });

  const {
    data: highRatingProductsData,
    isLoading: highRatingProductsLoading,
    error: highRatingProductsError,
  } = useQuery({
    queryKey: ['products', 'rating'],
    queryFn: () => getProductsAPI({ order: 'rating' }),
  });

  const hotProducts = hotProductsData
    ? {
        ...hotProductsData,
        list: hotProductsData.list.slice(0, 6),
      }
    : undefined;

  const highRatingProducts = highRatingProductsData
    ? {
        ...highRatingProductsData,
        list: highRatingProductsData.list.slice(0, 6),
      }
    : undefined;

  // 페이지네이션 설정
  const itemsPerPage = isDesktop ? 3 : 2;
  const ratingProductsList = highRatingProducts?.list || [];
  const totalPages = Math.ceil(ratingProductsList.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const paginatedRatingProducts = ratingProductsList.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  /* isDesktop 변경 시 현재 페이지를 0으로 리셋
   * sm, md일 떄 3페이지 -> lg일 때 3/2 로 표시되고 데이터 안 보이는 버그 있음
   * 일단 0으로 초기화 하고 시간 남으면 추후 개선
   */
  useEffect(() => {
    setCurrentPage(0);
  }, [isDesktop]);

  return (
    <div>
      {/* 배너 */}
      <div
        className={clsx(
          'banner',
          'bg-primary-orange-600 flex h-16 w-full items-center justify-center',
        )}
      >
        <span className='font-cafe24-supermagic text-h4-bold md:text-h3-bold tracking-[0.4px] text-white'>
          모가조아에서 지금 핫한 상품을 비교해보세요! 🚀
        </span>
      </div>
      <div
        className={clsx(
          'mx-auto mt-8 mb-13 max-w-[1064px] px-4 md:mt-9 md:mb-15 md:px-15',
          'content',
        )}
      >
        {/* 카테고리 */}
        <div className='category'>
          <h4 className={clsx(...SUBTITLE_STYLES)}>카테고리</h4>
        </div>

        {/* 리뷰어 랭킹 */}
        <div
          className={clsx(
            'mt-14 md:mt-16 lg:mt-14',
            'reviewers-ranking',
            hasCategory ? 'hidden md:block' : 'block',
          )}
        >
          <h4 className={clsx(...SUBTITLE_STYLES)}>리뷰어 랭킹</h4>
        </div>

        {/* 지금 핫한 상품 */}
        <div className={clsx('mt-14 lg:mt-15', 'hot-products', isFiltered ? 'hidden' : 'block')}>
          <h4 className={clsx(...SUBTITLE_STYLES)}>
            지금 핫한 상품 <span className='text-primary-orange-600'>Best</span>
          </h4>
          <div className='mt-5 grid grid-cols-2 gap-3 gap-y-8 md:mt-7 md:grid-cols-2 md:gap-5 md:gap-y-12 lg:grid-cols-3'>
            {hotProductsLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className='animate-pulse'>
                  <div className={clsx(...PRODUCT_IMAGE_LOADING_STYLES)}></div>
                </div>
              ))
            ) : hotProductsError ? (
              <div className='col-span-full py-8 text-center'>
                <p className='text-gray-500'>상품을 불러오는데 실패했습니다.</p>
              </div>
            ) : (
              hotProducts?.list.map((item: ProductItem) => (
                <ProductCard
                  key={item.id}
                  imgUrl={item.image}
                  name={item.name}
                  reviewCount={item.reviewCount}
                  likeCount={item.favoriteCount}
                  rating={item.rating}
                />
              ))
            )}
          </div>
        </div>

        <hr className='my-10 border-1 border-gray-200 md:my-12 lg:my-16'></hr>

        {/* 별점이 높은 상품 */}
        <div className={clsx('high-score-products', isFiltered ? 'hidden' : 'block')}>
          <div className='flex items-center gap-3'>
            <h4 className={clsx(...SUBTITLE_STYLES, 'flex-1')}>별점이 높은 상품</h4>
            <div>
              <span className='text-body1 text-gray-800'>
                {totalPages > 0 ? `${currentPage + 1}` : 0}
              </span>
              <span className='text-body2 text-gray-500'>
                /{totalPages > 0 ? `${totalPages}` : 0}
              </span>
            </div>
            <div className='flex gap-[6px] md:hidden'>
              <PaginationButton
                onClick={prevPage}
                disabled={currentPage === 0}
                direction='prev'
                size='sm'
              />
              <PaginationButton
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                direction='next'
                size='sm'
              />
            </div>
          </div>
          <div className='mt-5 md:mt-7'>
            <div className='relative'>
              <PaginationButton
                onClick={prevPage}
                disabled={currentPage === 0}
                direction='prev'
                size='md'
                className='absolute top-1/2 z-10 hidden -translate-y-1/2 md:-left-5 md:block lg:-left-14'
              />
              <div className='grid grid-cols-2 gap-3 gap-y-8 md:grid-cols-2 md:gap-5 md:gap-y-12 lg:grid-cols-3'>
                {highRatingProductsLoading ? (
                  Array.from({ length: itemsPerPage }).map((_, index) => (
                    <div key={index} className='animate-pulse'>
                      <div className={clsx(...PRODUCT_IMAGE_LOADING_STYLES)}></div>
                    </div>
                  ))
                ) : highRatingProductsError ? (
                  <div className='col-span-full py-8 text-center'>
                    <p className='text-gray-500'>상품을 불러오는데 실패했습니다.</p>
                  </div>
                ) : (
                  paginatedRatingProducts.map((item: ProductItem) => (
                    <ProductCard
                      key={item.id}
                      imgUrl={item.image}
                      name={item.name}
                      reviewCount={item.reviewCount}
                      likeCount={item.favoriteCount}
                      rating={item.rating}
                    />
                  ))
                )}
              </div>
              <PaginationButton
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                direction='next'
                size='md'
                className='absolute top-1/2 z-10 hidden -translate-y-1/2 md:-right-5 md:block lg:-right-14'
              />
            </div>
          </div>
        </div>

        {/* 필터링된 상품 */}
        {isFiltered && (
          <div className='filtered-products'>
            <div className='filtered-title'>{filteredTitle}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeClient;
