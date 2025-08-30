'use client';

import Dropdown from '@/components/Dropdown/Dropdown';
import DropdownItem from '@/components/Dropdown/DropdownItem';
import { useState } from 'react';

const SortTestPage = () => {
  const [selectedSort, setSelectedSort] = useState<string | null>('최신순');

  return (
    <div>
      <Dropdown initialValue={selectedSort} onChange={setSelectedSort} size='S'>
        <DropdownItem label='최신순' />
        <DropdownItem label='별점 높은순' />
        <DropdownItem label='별점 낮은순' />
        <DropdownItem label='좋아요순' />
      </Dropdown>
    </div>
  );
};

export default SortTestPage;
