import { cn } from '@/lib/cn';
import { HTMLAttributes } from 'react';

type ProductEditButtonProps = HTMLAttributes<HTMLButtonElement>;

const FloatingButton = ({ className, children, ...props }: ProductEditButtonProps) => {
  const interactionStyles = 'cursor-pointer hover-grow';
  return (
    <button
      className={cn(
        'flex-center absolute z-30 size-15 rounded-full border',
        interactionStyles,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default FloatingButton;
