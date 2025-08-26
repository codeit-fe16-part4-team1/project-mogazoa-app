'use client';

import Dropdown from '@/components/Dropdown/Dropdown';
const examepleItems = ['음악', '영화/드라마', '강의/책', '호텔', '가구/인테리어'];

const Home = () => {
  return (
    <div>
      <h1 className='font-cafe24-supermagic text-primary-orange-700 text-h1 font-bold'>header 1</h1>
      <h2 className='font-cafe24-supermagic text-primary-orange-300 text-h2'>header 2</h2>
      <h3 className='font-cafe24-supermagic text-h3 font-bold'>header 3</h3>
      <h4 className='font-cafe24-supermagic text-h4 font-bold'>header 4</h4>
      <p className='text-sub-headline text-state-error'>sub-headline</p>
      <p className='text-body1 font-bold text-gray-500'>body 1</p>
      <p className='text-body2'>body 2</p>
      <p className='text-caption'>caption</p>

      <div className='flex flex-col gap-5 px-10'>
        <h1 className='font-cafe-24-supermagic text-h1 text-primary-orange-700'>
          {' '}
          드롭다운 컴포넌트 예제
        </h1>
        <Dropdown items={examepleItems} placeholder='카테고리 선택' size='S'></Dropdown>
      </div>
    </div>
  );
};

export default Home;
