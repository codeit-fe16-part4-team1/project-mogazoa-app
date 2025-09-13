'use client';
import { Suspense, useEffect, useState } from 'react';
import ProductList from './ProductSection/ProductList';
import { getUserProductsAPI, ProductType } from '@/api/user/getUserProductsAPI';
import ProductOptionList from './ProductSection/ProductOptionList';
import { useQueryClient } from '@tanstack/react-query';
import { productKeys } from '@/constant/queryKeys';

interface Props {
  profileId: number;
}

const ProductSection = ({ profileId }: Props) => {
  const [productType, setProductType] = useState<ProductType>('reviewed');

  const queryClient = useQueryClient();

  // 등록한 상품, 찜한 상품 prefetch
  useEffect(() => {
    const prefetchProduct = async () => {
      await Promise.all([
        queryClient.prefetchInfiniteQuery({
          queryKey: productKeys.userProductList(profileId, 'created'),
          queryFn: ({ pageParam }) =>
            getUserProductsAPI({
              userId: profileId,
              type: 'created',
              ...(pageParam && { cursor: pageParam }),
            }),
          initialPageParam: 0,
          getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
          pages: 0,
        }),

        queryClient.prefetchInfiniteQuery({
          queryKey: productKeys.userProductList(profileId, 'favorite'),
          queryFn: ({ pageParam }) =>
            getUserProductsAPI({
              userId: profileId,
              type: 'favorite',
              ...(pageParam && { cursor: pageParam }),
            }),
          initialPageParam: 0,
          getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
          pages: 0,
        }),
      ]);
    };
    prefetchProduct();
  }, [profileId, queryClient]);

  return (
    <section className='px-4 pt-6 pb-30 md:px-15 md:pt-9 md:pb-18'>
      <ProductOptionList
        productType={productType}
        onChange={(value: ProductType) => setProductType(value)}
      />
      <Suspense fallback='로딩 중...'>
        <ProductList profileId={profileId} productType={productType} />
      </Suspense>
    </section>
  );
};

export default ProductSection;
