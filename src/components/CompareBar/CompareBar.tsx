'use client';

import { useState, useMemo } from 'react';
import IconClose from '@/assets/icons/IconClose.svg';
import { ProductItem } from '@/types/api';
import { useCompareStore } from '@/store/useCompareStore';
import { useQuery } from '@tanstack/react-query';
import { getProductsAPI } from '@/api/products/getProductsAPI';

interface CompareBarProps {
  selectedProduct: ProductItem | null;
  onSelectProduct: (product: ProductItem) => void;
  onRemoveProduct: () => void;
}

const CompareBar = ({ selectedProduct, onSelectProduct, onRemoveProduct }: CompareBarProps) => {
  const [inputValue, setInputValue] = useState('');
  const { products: comparisonProducts } = useCompareStore();

  const firstProductCategory = useMemo(() => {
    return comparisonProducts.filter(Boolean)[0]?.categoryId;
  }, [comparisonProducts]);

  const { data: searchResults, isFetching } = useQuery({
    queryKey: ['searchProducts', inputValue, firstProductCategory],
    queryFn: () =>
      getProductsAPI({ keyword: inputValue, category: firstProductCategory, order: 'recent' }),
    enabled: inputValue.length > 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  };

  const handleSelect = (product: ProductItem) => {
    setInputValue('');
    onSelectProduct(product);
  };

  const handleRemove = () => {
    onRemoveProduct();
  };

  const filteredResults = useMemo(() => {
    if (!searchResults) return [];

    const selectedIdsBucket = new Map(comparisonProducts.map((p) => [p?.id, true]));

    return searchResults.list.filter((product) => {
      const isSelected = selectedIdsBucket.has(product.id);
      return !isSelected;
    });
  }, [searchResults, comparisonProducts]);

  return (
    <div className='relative mx-auto w-full lg:w-[350px]'>
      {selectedProduct ? (
        <div className='inline-flex w-full items-center justify-between gap-3 rounded-full bg-gray-900 px-5 py-[18px] text-white'>
          <span className='text-body1-bold'>{selectedProduct.name}</span>
          <button onClick={handleRemove} className='cursor-pointer items-center justify-between'>
            <IconClose className='h-5 w-5' />
          </button>
        </div>
      ) : (
        <>
          <input
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            placeholder='상품명을 입력해 주세요'
            className='border-primary-orange-600 text-body1-medium focus:border-primary-orange-600 w-full rounded-full border-2 border-dashed bg-white px-5 py-[18px] text-gray-600 focus:border-2 focus:border-solid focus:outline-none'
          />
          {inputValue.length > 0 && (
            <ul className='rounded-x2 z-dropdown absolute mt-4 max-h-85 w-full gap-[5px] overflow-y-auto border border-gray-400 bg-white p-2.5'>
              {!isFetching && filteredResults.length > 0 ? (
                filteredResults.map((product) => (
                  <li
                    key={product.id}
                    onClick={() => handleSelect(product)}
                    className='rounded-x1 text-body1 w-full cursor-pointer px-5 py-2.5 text-gray-600 hover:bg-gray-100'
                  >
                    {product.name}
                  </li>
                ))
              ) : (
                <li className='px-5 py-2.5 text-gray-600'>검색 결과가 없습니다.</li>
              )}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default CompareBar;
