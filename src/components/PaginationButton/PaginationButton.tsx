import clsx from 'clsx';

export interface PaginationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled: boolean;
  direction: 'prev' | 'next';
  size: 'sm' | 'md';
}

const PaginationButton = ({
  onClick,
  disabled,
  direction,
  size = 'sm',
  className,
  ...props
}: PaginationButtonProps) => {
  const icon = direction === 'prev' ? '❮' : '❯';

  const baseClasses =
    'flex items-center justify-center rounded-full border-1 bg-white transition-colors';

  const sizeClasses = {
    sm: 'h-7 w-7 text-caption',
    md: 'h-10 w-10',
  };

  const variantClasses = disabled
    ? 'cursor-not-allowed border-gray-200 text-gray-300'
    : 'cursor-pointer border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseClasses, sizeClasses[size], variantClasses, className)}
      {...props}
    >
      {icon}
    </button>
  );
};

export default PaginationButton;
