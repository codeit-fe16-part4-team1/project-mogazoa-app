'use client';
import { useState } from 'react';
import { mockProductsList } from '../mock/product';
import ProductCard from '@/components/ProductCard/ProductCard';
import OptionList from '@/components/OptionButton/OptionList';

const ProductSection = () => {
  const [productType, setProductType] = useState('created');

  const OPTION_MAP = {
    created: '리뷰 남긴 상품',
    reviewed: '등록한 상품',
    favorte: '찜한 상품',
  } as const;

  return (
    <section className='px-4 pt-6 pb-11 md:px-15 md:pt-9 md:pb-18'>
      <OptionList className='mb-8' selectedValue={productType}>
        {Object.entries(OPTION_MAP).map(([value, label]) => (
          <OptionList.button key={value} value={value} onClick={() => setProductType(value)}>
            {label}
          </OptionList.button>
        ))}
      </OptionList>

      <div className='mx-auto grid max-w-235 grid-cols-2 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-12 lg:grid-cols-3'>
        {mockProductsList.list.map((product) => (
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
