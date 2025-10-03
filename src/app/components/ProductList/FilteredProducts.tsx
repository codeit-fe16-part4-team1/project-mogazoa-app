'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getProductsAPI } from '@/api/products/getProductsAPI';
import ProductCard from '@/app/components/ProductCard/ProductCard';
import Dropdown from '@/components/Dropdown/Dropdown';
import DropdownItem from '@/components/Dropdown/DropdownItem';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { ProductItem } from '@/types/api';

const GRID_STYLES =
  'grid grid-cols-2 gap-3 gap-y-8 md:grid-cols-2 md:gap-5 md:gap-y-12 lg:grid-cols-3';

type ORDER_BY = 'recent' | 'rating' | 'reviewCount';

interface FilteredProductsProps {
  searchKeyword: string;
  category: number | undefined;
  filteredTitle: string;
}

const FilteredProducts = ({ searchKeyword, category, filteredTitle }: FilteredProductsProps) => {
  const [orderBy, setOrderBy] = useState<ORDER_BY>('recent');
  const observerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const itemsPerPage = isDesktop ? 3 : 2;
  const [isMount, setIsMount] = useState(false);
  const isFiltered = category !== undefined || searchKeyword.trim().length > 0;
  const [queryEnabled, setQueryEnabled] = useState(false);

  const handleOrderChange = (value: string) => {
    setOrderBy(value as ORDER_BY);
  };

  useEffect(() => {
    setOrderBy('recent');
  }, [searchKeyword, category]);

  const {
    data: searchResults,
    isLoading: searchResultsLoading,
    error: searchResultsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', 'search', searchKeyword, category ?? null, orderBy],
    queryFn: ({ pageParam }) =>
      getProductsAPI({
        cursor: pageParam,
        keyword: searchKeyword,
        category: category,
        order: orderBy,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    enabled: isFiltered && isMount && queryEnabled,
  });

  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQueryEnabled(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 스크롤 감지하여 무한 스크롤 구현
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <section className='filtered-products' aria-label='searched products'>
      <div className='filtered-title mt-8 mb-5 flex items-center justify-between md:mb-7'>
        <div className='text-body1-bold md:text-sub-headline-bold text-gray-900'>
          {filteredTitle}
        </div>
        <div className='z-dropdown'>
          <Dropdown
            initialValue={orderBy}
            onChange={handleOrderChange}
            size='S'
            placeholder='최신순'
          >
            <DropdownItem label='최신순' value='recent' />
            <DropdownItem label='별점순' value='rating' />
            <DropdownItem label='리뷰순' value='reviewCount' />
          </Dropdown>
        </div>
      </div>
      <div className={GRID_STYLES}>
        {searchResultsLoading || !queryEnabled ? (
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <ProductCard.skeleton key={index} />
          ))
        ) : searchResultsError ? (
          <div className='col-span-full py-8 text-center'>
            <p className='text-gray-500'>상품을 불러오는데 실패했습니다.</p>
          </div>
        ) : (
          <>
            {searchResults?.pages?.flatMap((page) =>
              page.list.map((item: ProductItem) => (
                <ProductCard key={item.id} productItem={item} />
              )),
            )}
            <div ref={observerRef} className='col-span-full h-4' />
            {isFetchingNextPage && (
              <div className='col-span-full flex justify-center py-4'>
                <div className='text-gray-500'>로딩 중...</div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FilteredProducts;
