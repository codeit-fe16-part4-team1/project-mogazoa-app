import clsx from 'clsx';

interface CategoryButtonProps {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
}

const CategoryButton = ({ children, className, onClick }: CategoryButtonProps) => {
  return (
    <button
      className={clsx(
        'flex items-center justify-center rounded-[16px] border border-gray-300 bg-gray-100 transition-colors hover:bg-gray-200',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CategoryButton;
