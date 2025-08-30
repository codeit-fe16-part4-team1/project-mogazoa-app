'use client';

import Dropdown from '@/components/Dropdown/Dropdown';
import DropdownItem from '@/components/Dropdown/DropdownItem';
import { useState } from 'react';

const DropdownTestPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>('최신순');

  return (
    <div className='m-5 flex flex-col gap-70'>
      <Dropdown
        initialValue={selectedCategory}
        onChange={setSelectedCategory}
        placeholder='카테고리 선택'
        size='L'
      >
        <DropdownItem label='음악' />
        <DropdownItem label='영화' />
        <DropdownItem label='드라마' />
        <DropdownItem label='연극' />
      </Dropdown>

      <Dropdown initialValue={selectedSort} onChange={setSelectedSort} size='S'>
        <DropdownItem label='최신순' />
        <DropdownItem label='별점 높은순' />
        <DropdownItem label='별점 낮은순' />
        <DropdownItem label='좋아요순' />
      </Dropdown>
    </div>
  );
};

export default DropdownTestPage;
