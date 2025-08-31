'use client';
import { useState } from 'react';
import OptionList from '@/components/OptionList/OptionList';
import ProductCard from '@/components/ProductCard/ProductCard';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getUserProductsAPI, ProductType } from '@/api/user/getUserProductsAPI';
import clsx from 'clsx';

interface Props {
  id: number;
}

const ProductSection = ({ id }: Props) => {
  const [productType, setProductType] = useState<ProductType>('created');

  const { data: products } = useQuery({
    queryKey: ['products', productType, id],
    queryFn: () => getUserProductsAPI({ userId: id, type: productType }),
    placeholderData: keepPreviousData,
  });

  const OPTION_MAP: Record<ProductType, string> = {
    created: '리뷰 남긴 상품',
    reviewed: '등록한 상품',
    favorite: '찜한 상품',
  };

  if (!products) return;

  return (
    <section className='px-4 pt-6 pb-11 md:px-15 md:pt-9 md:pb-18'>
      <div className='mx-auto max-w-235'>
        <OptionList className='mb-8 flex flex-row' selectedValue={productType}>
          {Object.entries(OPTION_MAP).map(([value, label]) => (
            <OptionList.button
              key={value}
              role='tab'
              className={clsx(
                'text-sub-headline-medium flex items-center justify-center',
                'h-14 w-40',
                'cursor-pointer',
                'data-[state=active]:border-b-3 data-[state=active]:border-gray-900 data-[state=active]:text-gray-800',
                'data-[state=inactive]:border-b-1 data-[state=inactive]:border-gray-400 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:bg-gray-200',
              )}
              value={value}
              onClick={() => setProductType(value as ProductType)}
            >
              {label}
            </OptionList.button>
          ))}
        </OptionList>
      </div>
      <div className='mx-auto grid max-w-235 grid-cols-2 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-12 lg:grid-cols-3'>
        {products.list.map((product) => (
          <ProductCard
            key={product.id}
            imgUrl={product.image}
            name={product.name}
            reviewCount={product.reviewCount}
            likeCount={product.favoriteCount}
            rating={product.rating}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
