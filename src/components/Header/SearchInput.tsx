'use client';
import clsx from 'clsx';
import IconSearch from '@/assets/icons/search.svg';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  onClear?: () => void;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = '상품 이름을 검색해 보세요',
  className,
  autoFocus = false,
  onClear,
}: SearchInputProps) => {
  return (
    <div className={clsx('relative w-full', className)}>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 md:pl-5'>
        <IconSearch className='h-6 w-6 text-gray-600' />
      </div>
      <input
        type='text'
        placeholder={placeholder}
        className='bg-gray-150 text-body2 focus:border-primary-orange-500 focus:ring-primary-orange-500 block h-12 w-full rounded-full py-3 pr-4 pl-12 placeholder-gray-800 focus:ring-1 focus:outline-none md:h-full md:py-4 md:pl-14'
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
      />
      {value && (
        <button
          type='button'
          onClick={onClear}
          className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4 text-gray-500 hover:text-gray-800'
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchInput;
