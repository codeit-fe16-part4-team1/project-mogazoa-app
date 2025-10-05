import { Suspense, useState } from 'react';

import { josa } from 'es-hangul';

import Dropdown from '@/components/Dropdown/Dropdown';
import DropdownItem from '@/components/Dropdown/DropdownItem';
import { categoryList } from '@/lib/categoryList';

import ProductList from '../(user)/components/ProductSection/ProductList';
import SearchedProductList from './SearchedSection/SearchedProductList';
interface Props {
  categoryId: number;
  searchKeyword: string;
}

export type ORDER_BY = 'recent' | 'rating' | 'reviewCount';

const SearchedSection = ({ categoryId, searchKeyword }: Props) => {
  const [orderBy, setOrderBy] = useState<ORDER_BY>('recent');

  const onlyJosa = josa(searchKeyword, '으로/로').replace(searchKeyword, '');
  const category = categoryList.find((c) => c.id === categoryId)?.name;

  let title = '';
  if (!!category && !!searchKeyword)
    title = `${category}의 "${searchKeyword}"${onlyJosa} 검색한 상품`;
  else if (!!category) title = `${category}의 모든 상품`;
  else if (!!searchKeyword) title = `"${searchKeyword}"${onlyJosa} 검색한 상품`;

  const handleOrderChange = (value: string) => {
    setOrderBy(value as ORDER_BY);
  };

  return (
    <div className='z-dropdown'>
      <div className='mb-5 flex flex-row items-center md:mb-7'>
        <h2 className='text-sub-headline-bold grow'>{title}</h2>
        <Dropdown initialValue={orderBy} onChange={handleOrderChange} size='S' placeholder='최신순'>
          <DropdownItem label='최신순' value='recent' />
          <DropdownItem label='별점순' value='rating' />
          <DropdownItem label='리뷰순' value='reviewCount' />
        </Dropdown>
      </div>
      <Suspense fallback={<ProductList.skeleton />}>
        <SearchedProductList
          searchKeyword={searchKeyword}
          categoryId={categoryId}
          orderBy={orderBy}
        />
      </Suspense>
    </div>
  );
};

export default SearchedSection;
