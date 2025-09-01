import { cva } from 'class-variance-authority';
import { cn } from '@/lib/cn';
import { Menu } from '@headlessui/react';
import { DropdownContext } from './Dropdown';
import { Fragment, useContext } from 'react';

const dropdownItemVariants = cva('block cursor-pointer rounded-x1 text-body2 md:text-body1', {
  variants: {
    size: {
      S: 'py-2.5 px-3', //Dropdown 사이즈
      L: 'py-2.5 px-5', //Sort 사이즈
    },
    isSelected: {
      true: '',
      false: 'bg-white text-gray-600',
    },
    active: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      isSelected: true,
      className: 'text-body2-medium md:text-body1-medium',
    },
    {
      size: 'L',
      isSelected: false,
      active: true,
      className: 'bg-gray-100',
    },
    {
      size: 'L',
      isSelected: true,
      className: 'bg-primary-orange-200 text-primary-orange-600',
    },
    {
      size: 'S',
      isSelected: false,
      active: true,
      className: 'bg-gray-150',
    },
    {
      size: 'S',
      isSelected: true,
      className: 'bg-gray-900 text-white',
    },
  ],
  defaultVariants: {
    size: 'L',
    isSelected: false,
    active: false,
  },
});

interface DropdownItemProps {
  label: string;
  value: string;
}

const DropdownItem = ({ label, value }: DropdownItemProps) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('DropdownItem must be used within a Dropdown');
  }

  const { selectedValue, size, setLabelFromValue } = context;
  const isSelected = selectedValue === value;

  return (
    <Menu.Item as={Fragment}>
      {({ active }) => (
        <div
          className={cn(dropdownItemVariants({ size, isSelected, active }))}
          onClick={() => setLabelFromValue(value, label)}
        >
          {label}
        </div>
      )}
    </Menu.Item>
  );
};

export default DropdownItem;
