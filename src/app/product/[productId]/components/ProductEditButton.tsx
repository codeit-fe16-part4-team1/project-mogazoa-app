import { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import EditBtnIcon from '@/assets/icons/icon_product_edit.svg';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ProductEditButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const ProductEditButton = ({ className, ...props }: ProductEditButtonProps) => {
  const interactionStyles =
    'cursor-pointer hover:bg-primary-orange-600 hover:border-primary-orange-700 hover:border-2';
  return (
    <button
      className={cn(
        'flex-center hover-grow z-100 size-14 rounded-full border border-gray-400 bg-white md:size-16',
        interactionStyles,
        className,
      )}
      {...props}
    >
      <EditBtnIcon className='size-6 fill-white' />
    </button>
  );
};

export default ProductEditButton;
