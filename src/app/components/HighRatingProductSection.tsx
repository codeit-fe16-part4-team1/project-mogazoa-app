import { useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getProductsAPI } from '@/api/products/getProductsAPI';
import IconScroll from '@/assets/icons/icon_scroll_up.svg';
import { useIsDesktop } from '@/hooks/useIsDesktop';

import ProductCard from '../../components/ProductCard/ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';

const HighRatingProductSection = () => {
  const isDesktop = useIsDesktop();
  const slidesPerView = isDesktop ? 3 : 2;

  const [currentPage, setCurrentPage] = useState(0);

  const { data } = useSuspenseQuery({
    queryKey: ['products', 'rating'],
    queryFn: () => getProductsAPI({ order: 'rating' }),
  });

  const productList = data.list.slice(0, 6);
  const totalPages = Math.ceil(productList.length / slidesPerView);

  return (
    <section className='relative'>
      <div className='mb-5 flex flex-row items-center gap-3'>
        <h2 className='text-h4-bold font-cafe24-supermagic grow text-gray-900'>별점이 높은 상품</h2>
        <div className='text-body1'>
          <span className='text-gray-800'>{currentPage + 1}</span>
          <span className='text-gray-600'>{`/${totalPages}`}</span>
        </div>
        <div className='flex flex-row gap-2'>
          <button
            className={clsx(
              'swiper-button-prev-custom',
              'layout-center z-10 size-7 rounded-full border-1 border-gray-300 md:size-10',
              'md:absolute md:top-[42%] md:left-0 md:-translate-x-[50%] lg:-translate-x-[140%]',
            )}
          >
            <IconScroll className='rotate-270 p-2 text-gray-700' />
          </button>
          <button
            className={clsx(
              'swiper-button-next-custom',
              'layout-center z-10 size-7 rounded-full border-1 border-gray-300 md:size-10',
              'md:absolute md:top-[42%] md:right-0 md:translate-x-[50%] lg:translate-x-[140%]',
            )}
          >
            <IconScroll className='rotate-90 p-2 text-gray-700' />
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
        {productList.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard productItem={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HighRatingProductSection;
