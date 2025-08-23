import React from 'react';

export default {
  title: 'Design/Typography',
};

const typeStyles = [
  { name: 'h1', description: 'Header 1 - 32px, normal' },
  { name: 'h2', description: 'Header 2 - 28px, normal' },
  { name: 'h3', description: 'Header 3 - 24px, normal' },
  { name: 'h4', description: 'Header 4 - 20px, normal' },
  { name: 'sub-headline', description: 'Sub Headline - 18px, normal' },
  { name: 'body1', description: 'Body 1 - 16px, normal' },
  { name: 'body2', description: 'Body 2 - 14px, normal' },
  { name: 'caption', description: 'Caption - 12px, normal' },
  { name: 'Cafe24 H1', className: 'text-h1 font-bold font-cafe24-supermagic' },
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
