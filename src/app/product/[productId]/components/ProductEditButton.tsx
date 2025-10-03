import { HTMLAttributes } from 'react';

import EditBtnIcon from '@/assets/icons/icon_product_edit.svg';
import FloatingButton from '@/components/FloatingButton/FloatingButton';
import useDialog from '@/hooks/useDialog';
import { cn } from '@/lib/cn';

interface ProductEditButtonProps extends HTMLAttributes<HTMLButtonElement> {
  productId: number;
  categoryId: number;
  imageUrl: string;
  productName: string;
  description: string;
}

const ProductEditButton = ({
  className,
  productId,
  categoryId,
  imageUrl,
  productName,
  description,
  ...props
}: ProductEditButtonProps) => {
  const { open } = useDialog();

  const interactionStyles =
    'hover:bg-primary-orange-600 hover:border-primary-orange-700 hover:border-2';

  return (
    <FloatingButton
      className={cn('size-16 border-gray-400 bg-white', interactionStyles, className)}
      onClick={() =>
        open({
          dialogName: 'product-form-dialog',
          dialogProps: {
            mode: 'edit',
            productId,
            categoryId,
            imageUrl,
            productName,
            productDescription: description,
          },
          isBlockBackgroundClose: true,
        })
      }
      {...props}
    >
      <EditBtnIcon className='size-6 fill-white' />
    </FloatingButton>
  );
};

export default ProductEditButton;
