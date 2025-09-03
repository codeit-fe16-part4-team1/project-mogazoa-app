'use client';
import { Suspense, useState } from 'react';
import ProductList from './ProductSection/ProductList';
import { ProductType } from '@/api/user/getUserProductsAPI';
import ProductOptionList from './ProductSection/ProductOptionList';

interface Props {
  profileId: number;
}

const ProductSection = ({ profileId }: Props) => {
  const [productType, setProductType] = useState<ProductType>('reviewed');

  return (
    <section className='px-4 pt-6 pb-11 md:px-15 md:pt-9 md:pb-18'>
      <ProductOptionList
        productType={productType}
        onChange={(value: ProductType) => setProductType(value)}
      />
      <Suspense fallback={<div>로딩중...</div>}>
        <ProductList profileId={profileId} productType={productType} />
      </Suspense>
    </section>
  );
};

export default ProductSection;
