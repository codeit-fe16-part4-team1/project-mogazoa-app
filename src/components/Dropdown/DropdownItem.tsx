import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';

const dropdownItemVariants = cva('block cursor-pointer py-2.5 px-5 rounded-x1', {
  variants: {
    size: {
      S: 'text-body2',
      L: 'text-body1',
      mq: 'text-body2 md:text-body1',
    },
    isSelected: {
      true: 'bg-primary-orange-200 text-primary-orange-600 text-body2-bold',
      false: 'bg-white text-gray-600 hover:bg-gray-100',
    },
  },
  defaultVariants: {
    size: 'S',
  },
});

interface DropdownItemProps extends VariantProps<typeof dropdownItemVariants> {
  label: string;
  onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ label, onClick, size, isSelected }) => {
  return (
    <div className={clsx(dropdownItemVariants({ size, isSelected }))} onClick={onClick}>
      {label}
    </div>
  );
};

export default DropdownItem;
