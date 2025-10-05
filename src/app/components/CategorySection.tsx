'use client';
import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import clsx from 'clsx';

import CategoryChip from '@/components/Chip/CategoryChip';
import { categoryList } from '@/lib/categoryList';

const CategorySection = () => {
  const router = useRouter();
  const params = useSearchParams();
  const categoryId = Number(params.get('category'));

  const [selectedId, setSelectedId] = useState(categoryId);

  const handleCategoryButtonClick = (id: number) => {
    setSelectedId(id === selectedId ? 0 : id);
    const nextParams = new URLSearchParams();
    if (categoryId === id) {
      router.push('/');
    } else {
      nextParams.set('category', id.toString());
      router.push(`?${nextParams.toString()}`, { scroll: false });
    }
  };
  // URL 변경 시 동기화
  useEffect(() => {
    setSelectedId(categoryId);
  }, [categoryId]);

  return (
    <section>
      {/* <h2 className='text-h4-bold font-cafe24-supermagic mb-5 text-gray-900'>카테고리</h2> */}
      <div className='grid grid-cols-5 grid-rows-2 gap-[2vw] lg:grid-cols-10 lg:grid-rows-1 lg:gap-2'>
        {categoryList.map((category) => (
          <CategoryChip
            key={category.id}
            categoryId={category.id}
            className={clsx(
              'layout-center aspect-square w-full cursor-pointer flex-col gap-2 rounded-[5vw] border-1 text-[2vw] lg:rounded-4xl',
              'hover-animate hover:bg-primary-orange-100',
              selectedId === category.id
                ? 'bg-primary-orange-100 border-primary-orange-300'
                : 'border-gray-400 bg-white',
            )}
            onClick={() => handleCategoryButtonClick(category.id)}
          >
            <CategoryChip.icon
              className={clsx(
                'aspect-square w-[5vw] lg:w-7',
                'hover-animate',
                selectedId === category.id ? 'text-primary-orange-600' : 'text-gray-800',
              )}
            />
            <CategoryChip.text
              className={clsx(
                'text-[2.3vw] lg:text-xs',
                selectedId === category.id ? 'text-primary-orange-700' : 'text-gray-700',
              )}
            />
          </CategoryChip>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
