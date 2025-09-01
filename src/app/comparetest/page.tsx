'use client';

import { useState, useEffect } from 'react';
import CompareBar from '@/components/CompareBar/CompareBar';
import { getProductsAPI } from '@/api/products/getProductsAPI';
import { ProductItem } from '@/types/api';
import CompareImage from '@/components/CompareImage/CompareImage';

const CompareTestPage = () => {
  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        const { list } = await getProductsAPI({ keyword: '' });
        setAllProducts(list);
      } catch (err) {
        setError('상품 목록을 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const handleProductSelect = (product: ProductItem) => {
    console.log('Selected product:', product);
  };

  const handleProductRemove = (product: ProductItem) => {
    console.log('상품이 제거되었습니다:', product.name);
  };

  return (
    <div className='flex min-h-screen flex-col items-center p-8'>
      <h1 className='text-h1-bold mb-4'>CompareBar Test</h1>
      <div className='flex gap-8'>
        <div className='flex w-[340px] flex-col items-center justify-center gap-5'>
          <CompareImage placeholder='A' />
          <CompareBar
            products={allProducts}
            onSelectProduct={handleProductSelect}
            onRemoveProduct={handleProductRemove}
          />
        </div>

        <div className='flex w-[340px] flex-col items-center justify-center gap-5'>
          <CompareImage placeholder='B' />
          <CompareBar
            products={allProducts}
            onSelectProduct={handleProductSelect}
            onRemoveProduct={handleProductRemove}
          />
        </div>
      </div>
    </div>
  );
};

export default CompareTestPage;
