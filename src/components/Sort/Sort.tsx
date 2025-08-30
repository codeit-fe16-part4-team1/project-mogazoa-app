'use client';
import { cn } from '@/lib/cn';
import { useState, useRef, useEffect } from 'react';
import DropdownIcon from '@/assets/icons/DropdownIcon.svg';
import SortItem from './SortItem';

const sortOptions = ['최신순', '별점 높은순', '별점 낮은순', '좋아요순'];

interface SortProps {
  size: 'S' | 'L';
  value: string;
  onChange: (option: string) => void;
}

const Sort = ({ size = 'L', value, onChange }: SortProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = (option: string) => {
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className='relative w-[115px] md:w-[140px]' ref={sortRef}>
      <button
        type='button'
        className='rounded-x2 text-body2 md:text-body1 inline-flex h-[42px] w-full items-center justify-between border border-gray-300 bg-white pt-3 pr-3 pb-3 pl-4 text-gray-600 md:h-13 md:pt-4 md:pr-3 md:pb-4 md:pl-4'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value}</span>
        <DropdownIcon
          className={cn(
            'h-5 w-5 self-center text-gray-500 transition-transform duration-200',
            isOpen && 'scale-y-[-1]',
          )}
          aria-hidden='true'
        />
      </button>
      {isOpen && (
        <div className='rounded-x2 absolute mt-2 w-full gap-[5px] border border-gray-300 bg-white px-[6px] py-2 md:p-2'>
          <div role='menu' aria-orientation='vertical'>
            {sortOptions.map((option) => (
              <SortItem
                key={option}
                label={option}
                size={size}
                isSelected={value === option}
                onClick={() => handleItemClick(option)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;
