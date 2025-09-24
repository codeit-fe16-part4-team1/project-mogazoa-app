import clsx from 'clsx';
import { motion } from 'motion/react';
import { createContext, HTMLAttributes, useContext } from 'react';

interface OptionContextType {
  layoutId?: string;
  selectedValue?: string;
}

const OptionContext = createContext<OptionContextType>({
  layoutId: '',
  selectedValue: '',
});

interface ProviderProps {
  layoutId?: string;
  selectedValue?: string;
  className?: string;
  children: React.ReactNode;
}

const OptionList = ({ layoutId, children, selectedValue, className }: ProviderProps) => {
  return (
    <OptionContext.Provider value={{ selectedValue, layoutId }}>
      <div className={className} role='tablist'>
        {children}
      </div>
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
  activeStyle = 'text-gray-800',
  inactiveStyle = 'text-gray-400 hover:bg-gray-100',
  value,
  onClick,
  ...rest
}: ButtonProps) => {
  const { selectedValue, layoutId } = useContext(OptionContext);
  const isSelected = value === selectedValue;
  return (
    <button
      data-state={isSelected ? 'active' : 'inactive'}
      className={clsx(
        'hover-animate relative cursor-pointer',
        className,
        isSelected ? activeStyle : inactiveStyle,
      )}
      onClick={onClick}
      aria-label={`${value} 항목 보기 버튼`}
      role='tab'
      {...rest}
    >
      {children}
      {isSelected && (
        <motion.div
          layoutId={`underline-${layoutId}`}
          className='absolute bottom-0 z-1 h-0.5 w-full bg-gray-900'
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  );
};

OptionList.button = OptionButton;

export default OptionList;
