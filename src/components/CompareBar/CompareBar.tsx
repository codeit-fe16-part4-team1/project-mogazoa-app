'use client';

import { useState, useEffect } from 'react';
import IconClose from '@/assets/icons/IconClose.svg';
import { ProductItem } from '@/types/api';

interface CompareBarProps {
  products: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
  onRemoveProduct: (product: ProductItem) => void;
}

const CompareBar = ({ products, onSelectProduct, onRemoveProduct }: CompareBarProps) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    if (inputValue.length > 0 && !selectedProduct) {
      const trimmedKeyword = inputValue.toLowerCase();
      const newFilteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(trimmedKeyword),
      );
      setFilteredProducts(newFilteredProducts);
    } else {
      setFilteredProducts([]);
    }
  }, [inputValue, products, selectedProduct]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (product: ProductItem) => {
    setSelectedProduct(product);
    setInputValue('');
    setFilteredProducts([]);
    onSelectProduct(product);
  };

  const handleRemove = () => {
    if (selectedProduct) {
      onRemoveProduct(selectedProduct);
      setSelectedProduct(null);
    }
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
            <ul className='rounded-x2 absolute mt-4 w-full gap-[5px] border border-gray-400 bg-white p-2.5'>
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
