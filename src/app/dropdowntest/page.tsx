'use client';

import Dropdown from '@/components/Dropdown/Dropdown';
import DropdownItem from '@/components/Dropdown/DropdownItem';
import { useState, useEffect } from 'react';
import { getProductsAPI } from '@/api/products/getProductsAPI';
import { ProductItem } from '@/types/api';

const DropdownTestPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>('recent');
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 이 useEffect 훅은 selectedSort 값이 변경될 때마다 실행됩니다.
  useEffect(() => {
    const fetchSortedProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // getProductsAPI에 order 파라미터를 직접 전달합니다.
        // 드롭다운의 value prop이 API의 정렬 조건(recent, rating 등)과 일치해야 합니다.
        const { list } = await getProductsAPI({
          order: selectedSort as 'recent' | 'reviewCount' | 'rating',
        });
        setProducts(list);
      } catch (err) {
        setError('상품 목록을 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSortedProducts();
  }, [selectedSort]); // selectedSort 상태가 변경될 때마다 함수를 다시 실행합니다.

  // 로딩 및 오류 상태에 따라 화면에 표시될 내용을 분기 처리합니다.
  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='m-5 flex flex-col gap-70'>
      <Dropdown
        initialValue={selectedCategory}
        onChange={setSelectedCategory}
        placeholder='카테고리 선택'
        size='L'
      >
        <DropdownItem label='음악' value='music' />
        <DropdownItem label='영화' value='movie' />
        <DropdownItem label='드라마' value='drama' />
        <DropdownItem label='연극' value='theater' />
      </Dropdown>

      <Dropdown initialValue={selectedSort} onChange={setSelectedSort} size='S'>
        <DropdownItem label='최신순' value='recent' />
        <DropdownItem label='별점순' value='rating' />
        <DropdownItem label='리뷰순' value='reviewCount' />
      </Dropdown>
      {/* 정렬된 상품 목록을 화면에 표시합니다. */}
      <div className='mt-10'>
        <h2 className='text-lg font-bold'>정렬된 상품 목록</h2>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.id} className='mt-2 border-b pb-2'>
                <p>이름: {product.name}</p>
                <p>별점: {product.rating}점</p>
                <p>좋아요: {product.favoriteCount}개</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default DropdownTestPage;
