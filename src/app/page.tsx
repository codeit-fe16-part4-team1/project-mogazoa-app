'use client';

import React, { useEffect, useState } from 'react';
import Sort from '@/components/Sort/Sort';

const Home = () => {
  const [selectedSort, setSelectedSort] = useState('최신순');

  useEffect(() => {
    console.log('Selected Sort:', selectedSort);
  }, [selectedSort]);

  return (
    <div>
      <Sort size='mq' value={selectedSort} onChange={setSelectedSort} />
    </div>
  );
};

export default Home;
