'use client';
import clsx from 'clsx';
import ProductCard from '@/app/components/ProductCard/ProductCard';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import PaginationButton from '@/components/PaginationButton/PaginationButton';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getProductsAPI } from '@/api/products/getProductsAPI';
import { ProductItem } from '@/types/api';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { useSearchParams, useRouter } from 'next/navigation';
import { josa } from 'es-hangul';
import Dropdown from '@/components/Dropdown/Dropdown';
import DropdownItem from '@/components/Dropdown/DropdownItem';
import Category from '@/app/components/Category/Category';
import { useCategoryMap } from '@/hooks/useCategoryMap';
import UsersRanking from '@/app/components/UsersRanking/UsersRanking';
import BestBadge from './components/ProductCard/BestBadge';

const TITLE_STYLES = 'font-cafe24-supermagic text-h4-bold tracking-[-0.4px]';
const SUBTITLE_STYLES = `${TITLE_STYLES} text-gray-900 mb-5 md:mb-7`;
const PRODUCT_IMAGE_LOADING_STYLES = 'mb-3 aspect-square rounded-xl bg-gray-200';
const GRID_STYLES =
  'grid grid-cols-2 gap-3 gap-y-8 md:grid-cols-2 md:gap-5 md:gap-y-12 lg:grid-cols-3';

type ORDER_BY = 'recent' | 'rating' | 'reviewCount';

const HomeClient = () => {
  // 초기 랜딩 페이지 데이터 조회
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

  const hotProducts = hotProductsData?.list?.slice(0, 6) || [];
  const highRatingProducts = highRatingProductsData?.list?.slice(0, 6) || [];

  // 필터링 데이터 조회
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchKeyword = searchParams.get('query') || '';
  const categoryParam = searchParams.get('category');
  const [category, setCategory] = useState<number | undefined>(
    categoryParam ? Number(categoryParam) : undefined,
  );

  // const [category, setCategory] = useState<number | undefined>(undefined);
  const hasKeyword = searchKeyword.trim().length > 0;
  const hasCategory = category !== undefined;
  const isFiltered = hasKeyword || hasCategory;
  const [orderBy, setOrderBy] = useState<ORDER_BY>('recent');
  const { getCategoryName } = useCategoryMap();
  const observerRef = useRef<HTMLDivElement>(null);

  const handleOrderChange = (value: string) => {
    setOrderBy(value as ORDER_BY);
  };

  useEffect(() => {
    setOrderBy('recent');
  }, [isFiltered]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set('category', category.toString());
      console.log('set category');
    } else {
      params.delete('category');
      console.log('delete category');
    }
    router.push(`?${params.toString()}`);
  }, [category]);

  const filteredTitle = useMemo(() => {
    const categoryName = getCategoryName(category || 0) || '';
    const onlyJosa = josa(searchKeyword, '으로/로').replace(searchKeyword, '');

    if (hasCategory && hasKeyword) {
      return `${categoryName}의 '${searchKeyword}'${onlyJosa} 검색한 상품`;
    } else if (hasCategory) {
      return `${categoryName}의 모든 상품`;
    } else if (hasKeyword) {
      return `'${searchKeyword}'${onlyJosa} 검색한 상품`;
    } else {
      return '';
    }
  }, [category, searchKeyword, hasCategory, hasKeyword]);

  const {
    data: searchResults,
    isLoading: searchResultsLoading,
    error: searchResultsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', 'search', searchKeyword, category, orderBy],
    queryFn: ({ pageParam }) =>
      getProductsAPI({
        cursor: pageParam,
        keyword: searchKeyword,
        category: category,
        order: orderBy,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    enabled: isFiltered,
  });

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

  // 페이지네이션 설정
  const [currentPage, setCurrentPage] = useState(0);
  const isDesktop = useIsDesktop();
  const itemsPerPage = isDesktop ? 3 : 2;
  const totalPages = Math.ceil(highRatingProducts.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const paginatedRatingProducts = highRatingProducts.slice(startIndex, startIndex + itemsPerPage);

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
        style={{
          backgroundImage: 'url(/images/banner_pattern.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
        }}
      >
        <span className={`${TITLE_STYLES} md:text-h3-bold text-white`}>
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
        <section className='category' aria-label='category'>
          {!isFiltered && <h4 className={SUBTITLE_STYLES}>카테고리</h4>}
          <Category
            type={hasCategory ? 'tab' : 'button'}
            category={category}
            setCategory={setCategory}
          />
        </section>

        {/* 리뷰어 랭킹 */}
        {!isFiltered && (
          <section
            className={clsx('mt-14 md:mt-16 lg:mt-14', 'reviewers-ranking')}
            aria-label='reviewers ranking'
          >
            <h4 className={SUBTITLE_STYLES}>리뷰어 랭킹</h4>
            <UsersRanking />
          </section>
        )}

        {/* 지금 핫한 상품 */}
        <section
          className={clsx('mt-14 lg:mt-15', 'hot-products', isFiltered ? 'hidden' : 'block')}
          aria-label='best products'
        >
          <h4 className={SUBTITLE_STYLES}>
            지금 핫한 상품 <span className='text-primary-orange-600'>Best</span>
          </h4>
          <div className={GRID_STYLES}>
            {hotProductsLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className='animate-pulse'>
                  <div className={PRODUCT_IMAGE_LOADING_STYLES}></div>
                </div>
              ))
            ) : hotProductsError ? (
              <div className='col-span-full py-8 text-center'>
                <p className='text-gray-500'>상품을 불러오는데 실패했습니다.</p>
              </div>
            ) : (
              hotProducts.map((item: ProductItem, index) => (
                <div className='relative' key={item.id}>
                  <ProductCard
                    id={item.id}
                    imgUrl={item.image}
                    name={item.name}
                    reviewCount={item.reviewCount}
                    likeCount={item.favoriteCount}
                    rating={item.rating}
                    isLandingPage={true}
                  />
                  <BestBadge
                    rank={index + 1}
                    className='absolute top-1.5 left-1.5 md:top-2.5 md:left-2.5'
                  />
                </div>
              ))
            )}
          </div>
        </section>

        {!isFiltered && <hr className='my-10 border-1 border-gray-200 md:my-12 lg:my-16'></hr>}

        {/* 별점이 높은 상품 */}
        <section
          className={clsx('high-score-products', isFiltered ? 'hidden' : 'block', 'relative')}
          aria-label='high score products'
        >
          <div className='flex items-center gap-3'>
            <h4 className={`${SUBTITLE_STYLES} flex-1`}>별점이 높은 상품</h4>
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
          <div>
            <PaginationButton
              onClick={prevPage}
              disabled={currentPage === 0}
              direction='prev'
              size='md'
              className='absolute top-1/2 z-10 hidden -translate-y-1/2 md:-left-5 md:block lg:-left-14'
            />
            <div className={GRID_STYLES}>
              {highRatingProductsLoading ? (
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <div key={index} className='animate-pulse'>
                    <div className={PRODUCT_IMAGE_LOADING_STYLES}></div>
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
                    id={item.id}
                    imgUrl={item.image}
                    name={item.name}
                    reviewCount={item.reviewCount}
                    likeCount={item.favoriteCount}
                    rating={item.rating}
                    isLandingPage={true}
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
        </section>

        {/* 필터링된 상품 */}
        {isFiltered && (
          <section className='filtered-products' aria-label='searched products'>
            <div className='filtered-title mt-8 mb-5 flex items-center justify-between md:mb-7'>
              <div className='text-body1-bold md:text-sub-headline-bold text-gray-900'>
                {filteredTitle}
              </div>
              <div className='z-dropdown'>
                <Dropdown initialValue={orderBy} onChange={handleOrderChange} size='S'>
                  <DropdownItem label='최신순' value='recent' />
                  <DropdownItem label='별점순' value='rating' />
                  <DropdownItem label='리뷰순' value='reviewCount' />
                </Dropdown>
              </div>
            </div>
            <div className={GRID_STYLES}>
              {searchResultsLoading ? (
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
                      <ProductCard
                        key={item.id}
                        id={item.id}
                        imgUrl={item.image}
                        name={item.name}
                        reviewCount={item.reviewCount}
                        likeCount={item.favoriteCount}
                        rating={item.rating}
                      />
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
        )}
      </div>
    </div>
  );
};

export default HomeClient;
