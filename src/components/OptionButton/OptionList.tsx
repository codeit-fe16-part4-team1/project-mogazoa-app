interface ProviderProps {
  children: React.ReactNode;
}

const OptionList = ({ children }: ProviderProps) => {
  return <div className='flex flex-row'>{children}</div>;
};

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const OptionButton = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className='text-sub-headline flex h-14 w-40 items-center justify-center text-gray-800'
      onClick={onClick}
    >
      {children}
    </button>
  );
};

OptionList.button = OptionButton;

export default OptionList;
