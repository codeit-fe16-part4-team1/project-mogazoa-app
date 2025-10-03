'use client';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getProductsAPI } from '@/api/products/getProductsAPI';
import ProductCard from '@/app/components/ProductCard/ProductCard';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { cn } from '@/lib/cn';
import { ProductItem } from '@/types/api';

import 'swiper/css';
import 'swiper/css/navigation';

const TITLE_STYLES = 'font-cafe24-supermagic text-h4-bold tracking-[-0.4px]';
const SUBTITLE_STYLES = `${TITLE_STYLES} text-gray-900 mb-5 md:mb-7`;
const PRODUCT_IMAGE_LOADING_STYLES = 'mb-3 aspect-square rounded-xl bg-gray-200';
const SWIPER_NAV_PREV_POSITION =
  'absolute top-1/2 z-10 hidden -translate-y-1/2 md:-left-5 md:flex lg:-left-14';
const SWIPER_NAV_NEXT_POSITION =
  'absolute top-1/2 z-10 hidden -translate-y-1/2 md:-right-5 md:flex lg:-right-14 ';

interface HighRatingProductsProps {
  isVisible: boolean;
}

const HighRatingProducts = ({ isVisible }: HighRatingProductsProps) => {
  const {
    data: highRatingProductsData,
    isLoading: highRatingProductsLoading,
    error: highRatingProductsError,
  } = useQuery({
    queryKey: ['products', 'rating'],
    queryFn: () => getProductsAPI({ order: 'rating' }),
  });

  const highRatingProducts = highRatingProductsData?.list?.slice(0, 6) || [];
  const isDesktop = useIsDesktop();
  const slidesPerView = isDesktop ? 3 : 2;

  const totalPages = Math.ceil(highRatingProducts.length / slidesPerView);
  const [currentPage, setCurrentPage] = useState(0);

  if (!isVisible) return null;

  return (
    <section className='high-rating-products relative' aria-label='high rating products'>
      <div className='flex items-center gap-3'>
        <h4 className={`${SUBTITLE_STYLES} flex-1`}>별점이 높은 상품</h4>
        <div>
          <span className='text-body1 text-gray-800'>
            {totalPages > 0 ? `${currentPage + 1}` : 0}
          </span>
          <span className='text-body1 text-gray-700'>/{totalPages > 0 ? `${totalPages}` : 0}</span>
        </div>
        <div className='flex gap-[6px] md:hidden'>
          <button
            className='swiper-button-prev-custom text-caption size-7'
            aria-label='이전 상품 보기'
          >
            ❮
          </button>
          <button
            className='swiper-button-next-custom text-caption size-7'
            aria-label='다음 상품 보기'
          >
            ❯
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={isDesktop ? 20 : 12}
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerView}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        onSlideChange={(swiper: SwiperType) => {
          setCurrentPage(Math.floor(swiper.realIndex / slidesPerView));
        }}
      >
        {highRatingProductsLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className='animate-pulse'>
                <div className={PRODUCT_IMAGE_LOADING_STYLES}></div>
              </div>
            </SwiperSlide>
          ))
        ) : highRatingProductsError ? (
          <SwiperSlide>
            <div className='py-8 text-center'>
              <p className='text-gray-500'>상품을 불러오는데 실패했습니다.</p>
            </div>
          </SwiperSlide>
        ) : (
          highRatingProducts.map((item: ProductItem) => (
            <SwiperSlide key={item.id}>
              <ProductCard productItem={item} />
            </SwiperSlide>
          ))
        )}
      </Swiper>

      <button
        className={cn(`swiper-button-prev-custom size-10 ${SWIPER_NAV_PREV_POSITION}`)}
        aria-label='이전 상품 보기'
      >
        ❮
      </button>
      <button
        className={cn(`swiper-button-next-custom size-10 ${SWIPER_NAV_NEXT_POSITION}`)}
        aria-label='다음 상품 보기'
      >
        ❯
      </button>
    </section>
  );
};

export default HighRatingProducts;
