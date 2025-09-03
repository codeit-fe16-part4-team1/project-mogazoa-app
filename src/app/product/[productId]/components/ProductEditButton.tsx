import { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';
import EditBtnIcon from '@/assets/icons/icon_product_edit.svg';
import FloatingButton from '@/components/FloatingButton/FloatingButton';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ProductEditButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const ProductEditButton = ({ className, ...props }: ProductEditButtonProps) => {
  const interactionStyles =
    'hover:bg-primary-orange-600 hover:border-primary-orange-700 hover:border-2';

  return (
    <FloatingButton
      className={cn('size-14 border-gray-400 bg-white md:size-16', interactionStyles, className)}
      {...props}
    >
      <EditBtnIcon className='size-6 fill-white' />
    </FloatingButton>
  );
};

export default ProductEditButton;
