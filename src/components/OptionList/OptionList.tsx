import clsx from 'clsx';
import { createContext, HTMLAttributes, useContext } from 'react';

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
      <div className={className}>{children}</div>
    </OptionContext.Provider>
  );
};

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  activeStyle?: string;
  inactiveStyle?: string;
  value: string;
  onClick: () => void;
}

const OptionButton = ({
  children,
  className,
  activeStyle = 'border-b-3 border-gray-900 text-gray-800',
  inactiveStyle = 'border-b-1 border-gray-400 text-gray-400 hover:bg-gray-200',
  value,
  onClick,
  ...rest
}: ButtonProps) => {
  const { selectedValue } = useContext(OptionContext);
  const isSelected = value === selectedValue;
  return (
    <button
      data-state={isSelected ? 'active' : 'inactive'}
      className={clsx(className, isSelected ? activeStyle : inactiveStyle)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

OptionList.button = OptionButton;

export default OptionList;
