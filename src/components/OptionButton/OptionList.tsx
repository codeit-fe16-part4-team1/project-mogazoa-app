import clsx from 'clsx';
import { createContext, useContext } from 'react';

interface OptionContextType {
  selectedValue?: string;
}

const OptionContext = createContext<OptionContextType>({
  selectedValue: '',
});

interface ProviderProps {
  children: React.ReactNode;
  selectedValue?: string;
  className?: string;
}

const OptionList = ({ children, selectedValue, className }: ProviderProps) => {
  return (
    <OptionContext.Provider value={{ selectedValue }}>
      <div className={clsx('flex flex-row', className)}>{children}</div>
    </OptionContext.Provider>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  value: string;
  onClick: () => void;
}

const OptionButton = ({ children, value, onClick }: ButtonProps) => {
  const { selectedValue } = useContext(OptionContext);
  const isSelected = value === selectedValue;
  return (
    <button
      className={clsx(
        'text-sub-headline-medium flex h-14 w-40 items-center justify-center',
        isSelected
          ? 'border-b-3 border-gray-900 text-gray-800'
          : 'border-b-1 border-gray-400 text-gray-400',
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

OptionList.button = OptionButton;

export default OptionList;
