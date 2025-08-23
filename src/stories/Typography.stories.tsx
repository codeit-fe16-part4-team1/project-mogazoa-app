import React from 'react';

export default {
  title: 'Design/Typography',
};

const typeStyles = [
  // 일반 폰트 스타일
  { name: 'h1', className: 'font-sans text-h1' },
  { name: 'h2', className: 'font-sans text-h2' },
  { name: 'h3', className: 'font-sans text-h3' },
  { name: 'h4', className: 'font-sans text-h4' },
  { name: 'sub-headline', className: 'font-sans text-sub-headline' },
  { name: 'body1', className: 'font-sans text-body1' },
  { name: 'body2', className: 'font-sans text-body2' },
  { name: 'caption', className: 'font-sans text-caption' },
  // 볼드 폰트 스타일
  { name: 'h1-bold', className: 'font-sans text-h1-bold' },
  { name: 'h2-bold', className: 'font-sans text-h2-bold' },
  { name: 'h3-bold', className: 'font-sans text-h3-bold' },
  // Cafe24 폰트 스타일
  {
    name: 'Cafe24 H1',
    className: 'font-cafe24-supermagic text-h1-bold',
    description: 'Cafe24 폰트가 적용된 H1',
  },
  // 폰트 크기 예시
  { name: 'text-32px', className: 'font-sans text-[32px]' },
  { name: 'text-28px', className: 'font-sans text-[28px]' },
];

export const TypeSpecimens = () => (
  <div className='p-8'>
    <h1 className='text-3xl font-bold mb-6'>Typography</h1>
    {typeStyles.map((style) => (
      <div key={style.name} className='mb-4'>
        <h2 className='text-lg font-bold mb-1'>{style.name}</h2>
        <p className={style.className}>가나다라마바사아자차카타파하 ABCabc 12345</p>
      </div>
    ))}
  </div>
);
