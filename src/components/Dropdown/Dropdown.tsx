'use client';

import { useEffect, useRef, useState } from 'react';
import DropdownIcon from '@/assets/icons/DropdownIcon.svg';
import DropdownItem from './DropdownItem';

interface DropdownProps {
  items: string[];
  placeholder: string;
  size?: 'S' | 'L' | 'mq';
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  placeholder = '카테고리 선택',
  size = 'S',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className='relative w-[550px]' ref={dropdownRef}>
      <button
        type='button'
        className='rounded-x2 text-body1-medium inline-flex h-[50px] w-full items-center justify-between gap-3 border border-gray-400 bg-white py-5 pr-4 pl-6 text-gray-800'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedItem || placeholder}</span>
        <DropdownIcon
          className={`h-6 w-6 self-center transition-transform duration-200 ${isOpen ? 'scale-y-[-1]' : ''} `}
          aria-hidden='true'
        />
      </button>
      {isOpen && (
        <div className='rounded-x2 absolute mt-2 w-full gap-[5px] border border-gray-400 bg-white p-[10px]'>
          <div className='' role='menu' aria-orientation='vertical'>
            {items.map((item) => (
              <DropdownItem
                key={item}
                label={item}
                onClick={() => handleItemClick(item)}
                size={size}
                isSelected={selectedItem === item}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
