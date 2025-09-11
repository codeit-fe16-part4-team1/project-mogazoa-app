'use client';

import { useState, useEffect, useMemo } from 'react';
import IconClose from '@/assets/icons/IconClose.svg';
import { ProductItem } from '@/types/api';
import debounce from 'lodash.debounce';
import { useCompareStore } from '@/store/useCompareStore';

interface CompareBarProps {
  products: ProductItem[];
  selectedProduct: ProductItem | null;
  onSelectProduct: (product: ProductItem) => void;
  onRemoveProduct: () => void;
}

const CompareBar = ({
  products,
  selectedProduct,
  onSelectProduct,
  onRemoveProduct,
}: CompareBarProps) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([]);
  const { products: selectedCompareProducts } = useCompareStore();

  const debounceFilter = useMemo(
    () =>
      debounce((keyword: string) => {
        const trimmedKeyword = keyword.toLowerCase();
        const selectedIds = selectedCompareProducts.map((p) => p?.id);

        const newFilteredProducts = products.filter(
          (product) =>
            product.name.toLowerCase().includes(trimmedKeyword) &&
            !selectedIds.includes(product.id),
        );
        setFilteredProducts(newFilteredProducts);
      }, 0),
    [products, selectedCompareProducts],
  );
  useEffect(() => {
    if (selectedProduct === null) {
      setInputValue('');
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (inputValue.length > 0) {
      debounceFilter(inputValue);
    } else {
      setFilteredProducts([]);
    }
    return () => {
      debounceFilter.cancel();
    };
  }, [inputValue, debounceFilter]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (product: ProductItem) => {
    setInputValue('');
    setFilteredProducts([]);
    onSelectProduct(product);
  };

  const handleRemove = () => {
    onRemoveProduct();
  };

  return (
    <div className='relative mx-auto w-full lg:w-[350px]'>
      {selectedProduct ? (
        <div className='inline-flex w-full items-center justify-between gap-3 rounded-full bg-gray-900 px-5 py-[18px] text-white'>
          <span className='text-body1-bold'>{selectedProduct.name}</span>
          <button onClick={handleRemove} className='items-center justify-between'>
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
            <ul className='rounded-x2 z-dropdown absolute mt-4 w-full gap-[5px] border border-gray-400 bg-white p-2.5'>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
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
