'use client';

import { useContext } from 'react';
import { DropdownContext } from './Dropdown';
import { cn } from '@/lib/cn';

interface DropdownListProps {
  children: React.ReactNode;
}

const DropdownList = ({ children }: DropdownListProps) => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('DropdownList must be used within a Dropdown');
  }
  const { isOpen } = context;

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'rounded-x2 absolute mt-2 w-full gap-[5px] border border-gray-400 bg-white p-[10px]',
      )}
    >
      <div role='menu' aria-orientation='vertical'>
        {children}
      </div>
    </div>
  );
};

export default DropdownList;
