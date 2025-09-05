import { Button } from '@/components/Button/Button';
import useDialog from '@/hooks/useDialog';
import { cn } from '@/lib/cn';
import { OrderOptions } from '@/types/api';
import { HTMLAttributes } from 'react';

interface ProductBtnsProps extends HTMLAttributes<HTMLDivElement> {
  order: OrderOptions;
  productId: number;
  categoryName: string;
  productName: string;
  productImageUrl: string;
}

const ProductBtns = ({
  className,
  order,
  productId,
  categoryName,
  productName,
  productImageUrl,
  ...props
}: ProductBtnsProps) => {
  const { open } = useDialog();

  return (
    <div className={cn('flex-between-center flex-col gap-3 md:flex-row', className)} {...props}>
      <Button className='w-full md:basis-18/31 lg:w-0'>다른 상품과 비교하기</Button>
      <Button
        className='w-full md:basis-13/31 lg:w-0'
        intent='secondary'
        onClick={() =>
          open({
            dialogName: 'review-form-dialog',
            dialogProps: {
              mode: 'create',
              order,
              productId,
              categoryName,
              productName,
              productImageUrl,
            },
            isBlockBackgroundClose: true,
          })
        }
      >
        리뷰 작성하기
      </Button>
    </div>
  );
};

export default ProductBtns;
