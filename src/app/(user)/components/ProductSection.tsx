'use client';
import { useState } from 'react';
import { mockProductsList } from '../mock/product';
import ProductCard from '@/components/ProductCard/ProductCard';
import OptionList from '@/components/OptionButton/OptionList';

const ProductSection = () => {
  const [productType, setProductType] = useState('created');

  return (
    <section className='px-4 pt-6 pb-11 md:px-15 md:pt-9 md:pb-18'>
      <div>{productType}</div>
      <OptionList>
        <OptionList.button onClick={() => setProductType('created')}>
          리뷰 남기 상품
        </OptionList.button>
        <OptionList.button onClick={() => setProductType('reviewed')}>
          등록한 상품
        </OptionList.button>
        <OptionList.button onClick={() => setProductType('favorite')}>찜한 상품</OptionList.button>
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
