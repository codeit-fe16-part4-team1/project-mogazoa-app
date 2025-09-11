import { Button } from '@/components/Button/Button';
import useDialog from '@/hooks/useDialog';
import { cn } from '@/lib/cn';
import { OrderOptions, ProductItem } from '@/types/api';
import { HTMLAttributes } from 'react';
import { useCompareStore } from '@/store/useCompareStore';

interface ProductBtnsProps extends HTMLAttributes<HTMLDivElement> {
  order: OrderOptions;
  productId: number;
  categoryName: string;
  productName: string;
  productImageUrl: string;
  authenticated: boolean;
  product: ProductItem;
}

const ProductBtns = ({
  className,
  order,
  product,
  productId,
  categoryName,
  productName,
  productImageUrl,
  authenticated,
  ...props
}: ProductBtnsProps) => {
  const { products, addProduct } = useCompareStore();
  const { open } = useDialog();

  const handleCompareClick = () => {
    const isDuplicate = products.some((p) => p?.id === product.id);
    if (isDuplicate) {
      open({ dialogName: 'duplicate-dialog' });
      return;
    }
    if (products.filter(Boolean).length < 2) {
      addProduct(product);
    } else {
      open({
        dialogName: 'compare-dialog',
        dialogProps: {
          products: products,
          newProduct: product,
        },
      });
    }
  };

  return (
    <div className={cn('flex-between-center flex-col gap-3 md:flex-row', className)} {...props}>
      <Button className='h-12 w-full md:h-15 md:basis-18/31 lg:w-0' onClick={handleCompareClick}>
        다른 상품과 비교하기
      </Button>
      <Button
        className='h-12 w-full md:h-15 md:basis-13/31 lg:w-0'
        intent='secondary'
        disabled={!authenticated}
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
