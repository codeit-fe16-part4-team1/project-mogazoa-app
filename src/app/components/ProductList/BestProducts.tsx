'use client';
import { useQuery } from '@tanstack/react-query';
import { getProductsAPI } from '@/api/products/getProductsAPI';
import { ProductItem } from '@/types/api';
import ProductCard from '@/app/components/ProductCard/ProductCard';
import BestBadge from '../ProductCard/BestBadge';

const TITLE_STYLES = 'font-cafe24-supermagic text-h4-bold tracking-[-0.4px]';
const SUBTITLE_STYLES = `${TITLE_STYLES} text-gray-900 mb-5 md:mb-7`;
const PRODUCT_IMAGE_LOADING_STYLES = 'mb-3 aspect-square rounded-xl bg-gray-200';
const GRID_STYLES =
  'grid grid-cols-2 gap-3 gap-y-8 md:grid-cols-2 md:gap-5 md:gap-y-12 lg:grid-cols-3';

interface BestProductsProps {
  isVisible: boolean;
}

const BestProducts = ({ isVisible }: BestProductsProps) => {
  const {
    data: bestProductsData,
    isLoading: bestProductsLoading,
    error: bestProductsError,
  } = useQuery({
    queryKey: ['products', 'reviewCount'],
    queryFn: () => getProductsAPI({ order: 'reviewCount' }),
  });

  const bestProducts = bestProductsData?.list?.slice(0, 6) || [];

  if (!isVisible) return null;

  return (
    <section className='best-products' aria-label='best products'>
      <h4 className={SUBTITLE_STYLES}>
        지금 핫한 상품 <span className='text-primary-orange-600'>Best</span>
      </h4>
      <div className={GRID_STYLES}>
        {bestProductsLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className='animate-pulse'>
              <div className={PRODUCT_IMAGE_LOADING_STYLES}></div>
            </div>
          ))
        ) : bestProductsError ? (
          <div className='col-span-full py-8 text-center'>
            <p className='text-gray-500'>상품을 불러오는데 실패했습니다.</p>
          </div>
        ) : (
          bestProducts.map((item: ProductItem, index) => (
            <div className='relative' key={item.id}>
              <ProductCard productItem={item} />
              <BestBadge
                rank={index + 1}
                className='absolute top-1.5 left-1.5 md:top-2.5 md:left-2.5'
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default BestProducts;
