// CompareBar.tsx
'use client';

import { useState, useEffect } from 'react';
import { getProductsAPI } from '@/api/getProductsAPI';
import { ProductItem } from '@/types/api';

interface CompareBarProps {
  onSelectProduct: (product: ProductItem) => void;
}

const CompareBar = ({ onSelectProduct }: CompareBarProps) => {
  const [inputValue, setInputValue] = useState('');
  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 컴포넌트 마운트 시 전체 상품 목록 한 번만 불러오기
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

  // 입력값이 변경될 때마다 필터링
  useEffect(() => {
    if (inputValue.length > 0) {
      const trimmedKeyword = inputValue.toLowerCase();
      const newFilteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(trimmedKeyword),
      );
      setFilteredProducts(newFilteredProducts);
    } else {
      setFilteredProducts([]);
    }
  }, [inputValue, allProducts]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (product: ProductItem) => {
    setInputValue(product.name);
    setFilteredProducts([]); // 목록 숨기기
    onSelectProduct(product); // 부모 컴포넌트에 선택된 상품 전달
  };

  if (isLoading) {
    return <div>상품 목록 로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='relative w-full'>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='상품명을 입력하세요'
        className='border-primary-orange-600 text-body1-medium hover:border-primary-orange-700 w-full gap-3 rounded-full border-2 border-dashed px-5 py-[18px] text-gray-600 hover:border-solid focus:border-solid lg:w-[350px]'
      />
      {inputValue.length > 0 && (
        <ul className='absolute z-10 mt-2 w-full rounded-md border border-gray-400 bg-white p-2 shadow-lg'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li
                key={product.id}
                onClick={() => handleSelect(product)}
                className='cursor-pointer rounded-md p-2 hover:bg-gray-100'
              >
                {product.name}
              </li>
            ))
          ) : (
            <li className='p-2 text-gray-500'>검색 결과가 없습니다.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CompareBar;
