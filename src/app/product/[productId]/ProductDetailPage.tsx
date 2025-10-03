'use client';

import { Suspense, useState } from 'react';

import Dropdown from '@/components/Dropdown/Dropdown';
import DropdownItem from '@/components/Dropdown/DropdownItem';
import { ThreeDotsIndicator } from '@/components/ThreeDotIndicator/ThreeDotIndicator';
import { cn } from '@/lib/cn';
import { OrderOptions } from '@/types/api';

import ProductBtns from './components/ProductBtns';
import ProductDetailHeader from './components/ProductDetailHeader';
import ProductEditButton from './components/ProductEditButton';
import ProductImage from './components/ProductImage';
import ProductInfo from './components/ProductInfo';
import ProductReviewList from './components/ProductReviewList';
import ProductShareBtns from './components/ProductShareBtns';
import ProductStatisticCard from './components/ProductStatisticCard';
import { useProductData } from './hooks/useProductData';

interface ProductDetailPageProps {
  productId: number;
  order: OrderOptions;
  userId: number;
  authenticated: boolean;
}

const ProductDetailPage = ({
  productId,
  order: initialOrder,
  userId,
  authenticated,
}: ProductDetailPageProps) => {
  const [order, setOrder] = useState<OrderOptions>(initialOrder);
  const { data: product } = useProductData(productId);

  const pageContainerStyles = 'lg:mx-auto lg:w-full lg:max-w-[980px]';

  return (
    <main className='fullscreen bg-gray-100'>
      {/*  페이지 상단 컨테이너 */}
      <section className='bg-white'>
        {/* 상품 이미지와 상품 설명 컨테이너 - 데스크톱에서 가로로 변경 가운데 정렬 및 max-width설정 */}
        <article
          className={cn(
            'lg:flex lg:items-center lg:justify-between lg:gap-11 lg:py-12',
            pageContainerStyles,
          )}
        >
          {/* 상품 이미지 컨테이너 */}
          <ProductImage className='lg:flex-1 lg:self-end' imageUrl={product.image} />
          {/* 상품 설명 컨테이너 */}
          <section className='relative w-full px-5 py-8 md:px-16 md:py-12 lg:basis-51/100 lg:self-end lg:p-0'>
            {userId === product.writerId && (
              <ProductEditButton
                className='absolute top-[-48px] right-5 md:top-[-32px] md:right-13 lg:top-[-32px] lg:right-0'
                productId={product.id}
                categoryId={product.category.id}
                imageUrl={product.image}
                productName={product.name}
                description={product.description}
              />
            )}

            <ProductInfo
              categoryId={product.category.id}
              categoryName={product.category.name}
              productName={product.name}
              description={product.description}
            />
            <ProductShareBtns
              productId={product.id}
              isHeartFavorite={product.isFavorite}
              authenticated={authenticated}
            />
            <ProductBtns
              order={order}
              productId={productId}
              product={product}
              categoryName={product.category.name}
              productName={product.name}
              productImageUrl={product.image}
              authenticated={authenticated}
            />
          </section>
        </article>
      </section>
      {/* 페이지 하단 컨테이너 */}
      <section>
        {/* 상품 통계 및 리뷰 리스트 컨테이너 - 데스크톱에서 가운데 정렬 및 max-width 설정 */}
        <article className={cn('px-5 pt-7 pb-10', pageContainerStyles)}>
          {/* 상품 통계 */}
          <section className='mb-12'>
            <ProductDetailHeader className='mb-5 md:mb-7'>
              <span className='text-sub-headline-bold text-gray-900'>🌟상품 통계</span>
            </ProductDetailHeader>
            <div className='flex-center flex-col gap-5 md:grid md:grid-cols-3'>
              <ProductStatisticCard
                value={product.rating}
                metricValue={product.categoryMetric.rating}
                statistic='rating'
              />
              <ProductStatisticCard
                value={product.favoriteCount}
                metricValue={product.categoryMetric.favoriteCount}
                statistic='favoriteCount'
              />
              <ProductStatisticCard
                value={product.reviewCount}
                metricValue={product.categoryMetric.reviewCount}
                statistic='reviewCount'
              />
            </div>
          </section>
          {/* 상품 리뷰 리스트 */}
          <section>
            <ProductDetailHeader className='mb-5 md:mb-7'>
              <span className='text-sub-headline-bold text-gray-900'>✍️상품 리뷰</span>
              <Dropdown
                initialValue={order}
                size='S'
                onChange={(selectedOption) => setOrder(selectedOption as OrderOptions)}
              >
                <DropdownItem label='최신순' value='recent' />
                <DropdownItem label='별점 높은순' value='ratingDesc' />
                <DropdownItem label='별점 낮은순' value='ratingAsc' />
                <DropdownItem label='좋아요순' value='likeCount' />
              </Dropdown>
            </ProductDetailHeader>
            <div className='relative mb-4 lg:mb-16'>
              <Suspense fallback={<ThreeDotsIndicator className='' />}>
                <ProductReviewList
                  productId={productId}
                  order={order}
                  userId={userId}
                  categoryName={product.category.name}
                  productName={product.name}
                  productImageUrl={product.image}
                  authenticated={authenticated}
                />
              </Suspense>
            </div>
          </section>
        </article>
      </section>
    </main>
  );
};

export default ProductDetailPage;
