'use client';

import { useEffect, useRef, useState, createContext } from 'react';
import DropdownIcon from './DropdownIcon';

interface DropdownContextProps {
  setSelectedItem: (item: string) => void;
  selectedItem: string | null;
  size: 'S' | 'L' | 'mq';
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

export const DropdownContext = createContext<DropdownContextProps>({
  setSelectedItem: () => {},
  selectedItem: null,
  size: 'S', // 초기값 S를 명시
  setIsOpen: () => {},
  isOpen: false,
});
interface DropdownProps {
  children: React.ReactNode;
  placeholder: string;
  size?: 'S' | 'L' | 'mq'; // 'mq' size is removed from DropdownItemProps
}

const Dropdown = ({ children, placeholder = '카테고리 선택', size = 'S' }: DropdownProps) => {
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

  return (
    <DropdownContext.Provider value={{ setSelectedItem, selectedItem, size, setIsOpen, isOpen }}>
      <div className='relative w-[550px]' ref={dropdownRef}>
        <button
          type='button'
          className='rounded-x2 text-body2-medium inline-flex h-[50px] w-full items-center justify-between gap-3 border border-gray-400 bg-white py-5 pr-4 pl-6 text-gray-800'
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedItem || placeholder}</span>
          <DropdownIcon
            className={`h-6 w-6 self-center transition-transform duration-200 ${isOpen ? 'scale-y-[-1]' : ''} `}
            aria-hidden='true'
          />
        </button>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
