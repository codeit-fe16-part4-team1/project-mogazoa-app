'use client';
import { cva } from 'class-variance-authority';
import React, { useContext } from 'react';
import { DropdownContext } from './DropdownTest';

const dropdownItemVariants = cva('block cursor-pointer py-2.5 px-5 rounded-x1', {
  variants: {
    size: {
      S: 'text-body2',
      L: 'text-body2 lg:text-body1',
    },
    isSelected: {
      true: 'bg-primary-orange-200 text-primary-orange-600',
      false: 'bg-white text-gray-600 hover:bg-gray-100',
    },
  },
  compoundVariants: [
    {
      size: 'S',
      isSelected: true,
      className: 'text-body2-medium',
    },
    {
      size: 'L',
      isSelected: true,
      className: 'text-body1-medium',
    },
  ],
  defaultVariants: {
    size: 'L',
    isSelected: false,
  },
});

interface DropdownItemProps {
  label: string;
  onClick?: () => void;
}

const DropdownItem = ({ label, onClick }: DropdownItemProps) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('DropdownItem must be used within a Dropdown');
  }

  const { selectedItem, setSelectedItem, size, setIsOpen } = context;
  const isSelected = selectedItem === label;

  const handleClick = () => {
    setSelectedItem(label);
    setIsOpen(false);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={dropdownItemVariants({ size, isSelected })} onClick={handleClick}>
      {label}
    </div>
  );
};

export default DropdownItem;
