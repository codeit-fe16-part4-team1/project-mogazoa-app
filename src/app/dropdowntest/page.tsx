'use client';

import Dropdown from '@/components/Dropdown/Dropdown';
import DropdownItem from '@/components/Dropdown/DropdownItem';
import { useState } from 'react';

const DropdownTestPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div>
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
    </div>
  );
};

export default DropdownTestPage;
