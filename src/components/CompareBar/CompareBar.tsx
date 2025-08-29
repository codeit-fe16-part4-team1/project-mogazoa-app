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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        // 빈 keyword로 API 호출하여 전체 목록을 가져옵니다.
        const { list } = await getProductsAPI({ keyword: '' });
        setAllProducts(list);
        setFilteredProducts(list); // 초기에는 전체 목록을 보여줍니다.
      } catch (err) {
        setError('상품 목록을 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllProducts();
  }, []);
  useEffect(() => {
    if (inputValue.length > 0) {
      const trimmedKeyword = inputValue.toLowerCase();
      const newFilteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(trimmedKeyword),
      );
      setFilteredProducts(newFilteredProducts);
    } else {
      // 입력값이 없으면 전체 목록으로 되돌립니다.
      setFilteredProducts(allProducts);
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
    <div className='relative'>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='상품명을 입력하세요'
      />
      {inputValue.length > 0 && (
        <ul className='absolute z-10 w-full border border-gray-300 bg-white'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li
                key={product.id}
                onClick={() => handleSelect(product)}
                className='cursor-pointer p-2 hover:bg-gray-100'
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
