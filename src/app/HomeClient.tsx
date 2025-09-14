'use client';
import clsx from 'clsx';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { josa } from 'es-hangul';
import Category from '@/app/components/Category/Category';
import { useCategoryMap } from '@/hooks/useCategoryMap';
import UsersRanking from '@/app/components/UsersRanking/UsersRanking';
import BestProducts from '@/app/components/ProductList/BestProducts';
import HighRatingProducts from '@/app/components/ProductList/HighRatingProducts';
import FilteredProducts from '@/app/components/ProductList/FilteredProducts';

const TITLE_STYLES = 'font-cafe24-supermagic text-h4-bold tracking-[-0.4px]';
const SUBTITLE_STYLES = `${TITLE_STYLES} text-gray-900 mb-5 md:mb-7`;

const HomeClient = () => {
  // 필터링 데이터 조회
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchKeyword = searchParams.get('query') || '';
  const categoryParam = searchParams.get('category');
  const [category, setCategory] = useState<number | undefined>(
    categoryParam ? Number(categoryParam) : undefined,
  );

  const hasKeyword = searchKeyword.trim().length > 0;
  const hasCategory = category !== undefined;
  const isFiltered = hasKeyword || hasCategory;
  const { getCategoryName } = useCategoryMap();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set('category', category.toString());
    } else {
      params.delete('category');
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [category, router, searchParams]);

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
  }, [category, searchKeyword, hasCategory, hasKeyword, getCategoryName]);

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
        <div className={clsx('mt-14 lg:mt-15', isFiltered ? 'hidden' : 'block')}>
          <BestProducts isVisible={!isFiltered} />
        </div>

        {!isFiltered && <hr className='my-10 border-1 border-gray-200 md:my-12 lg:my-16'></hr>}

        {/* 별점이 높은 상품 */}
        <div className={clsx(isFiltered ? 'hidden' : 'block')}>
          <HighRatingProducts isVisible={!isFiltered} />
        </div>

        {/* 필터링된 상품 */}
        {isFiltered && (
          <FilteredProducts
            searchKeyword={searchKeyword}
            category={category}
            filteredTitle={filteredTitle}
          />
        )}
      </div>
    </div>
  );
};

export default HomeClient;
