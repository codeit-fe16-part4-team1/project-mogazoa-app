'use client';
import { Suspense, useState } from 'react';
import OptionList from '@/components/OptionList/OptionList';
import clsx from 'clsx';
import ProductList from './ProductList';
import { ProductType } from '@/api/user/getUserProductsAPI';

interface Props {
  profileId: number;
}

const ProductSection = ({ profileId }: Props) => {
  const [productType, setProductType] = useState<ProductType>('reviewed');

  const OPTION_MAP: Record<ProductType, string> = {
    reviewed: '리뷰 남긴 상품',
    created: '등록한 상품',
    favorite: '찜한 상품',
  };

  return (
    <section className='px-4 pt-6 pb-11 md:px-15 md:pt-9 md:pb-18'>
      <article className='mx-auto max-w-235'>
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
      </article>
      <Suspense fallback={<div>로딩중...</div>}>
        <ProductList profileId={profileId} productType={productType} />
      </Suspense>
    </section>
  );
};

export default ProductSection;
