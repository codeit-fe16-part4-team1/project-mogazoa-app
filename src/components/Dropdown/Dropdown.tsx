import { Menu } from '@headlessui/react';
import { cn } from '@/lib/cn';
import DropdownIcon from '@/assets/icons/DropdownIcon.svg';
import { createContext, useState, useEffect, Children, isValidElement, ReactElement } from 'react';

interface DropdownItemProps {
  label: string;
  value: string;
}
interface DropdownContextProps {
  selectedValue: string | null;
  selectedLabel: string | null;
  size: 'S' | 'L';
  setLabelFromValue: (value: string, label: string) => void;
}
export const DropdownContext = createContext<DropdownContextProps | null>(null);

interface DropdownProps {
  children: React.ReactNode;
  placeholder?: string;
  initialValue?: string | null;
  size: 'S' | 'L';
  onChange: (value: string) => void;
}

const Dropdown = ({
  children,
  placeholder = '카테고리 선택',
  initialValue,
  size = 'L',
  onChange,
}: DropdownProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(initialValue || null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const options = Children.toArray(children)
    .filter(isValidElement)
    .map((child) => {
      const { value, label } = (child as ReactElement<DropdownItemProps>).props;
      return { value, label };
    });

  useEffect(() => {
    if (initialValue) {
      const initialOption = options.find((option) => option.value === initialValue);
      if (initialOption) {
        setSelectedLabel(initialOption.label);
      }
    } else {
      setSelectedLabel(null);
    }
  }, [initialValue, options]);

  const setLabelFromValue = (value: string, label: string) => {
    setSelectedValue(value);
    setSelectedLabel(label);
    onChange(value);
  };

  return (
    <DropdownContext.Provider value={{ selectedValue, selectedLabel, size, setLabelFromValue }}>
      <Menu as='div' className={cn('relative', size === 'S' && 'w-[115px] md:w-[140px]')}>
        {({ open }) => (
          <>
            <Menu.Button
              as='button'
              className={cn(
                'rounded-x2 inline-flex w-full items-center justify-between border bg-white pt-3 pr-3 pb-3 pl-4',
                size === 'S'
                  ? 'text-body2 md:text-body1 h-[42px] border-gray-300 pt-3 pr-3 pb-3 pl-4 whitespace-nowrap text-gray-600 md:h-13'
                  : 'text-body2-medium h-[50px] border-gray-400 text-gray-800',
              )}
            >
              <span>{selectedLabel || placeholder}</span>
              <DropdownIcon
                className={cn(
                  'self-center transition-transform duration-200',
                  open && 'scale-y-[-1]',
                  size === 'S' ? 'h-5 w-5 text-gray-500' : 'h-6 w-6',
                )}
                aria-hidden='true'
              />
            </Menu.Button>
            {open && (
              <Menu.Items
                as='div'
                className={cn(
                  'rounded-x2 absolute z-[999] mt-3 w-full gap-[5px] border bg-white',
                  size === 'S'
                    ? 'border-gray-300 px-[6px] py-2 md:p-2'
                    : 'border-gray-400 p-[10px]',
                )}
              >
                {children}
              </Menu.Items>
            )}
          </>
        )}
      </Menu>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
