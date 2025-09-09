import { Button } from '@/components/Button/Button';
import useDialog from '@/hooks/useDialog';
import useDialogStore from '@/store/useDialogStore';
import { cn } from '@/lib/cn';
import { OrderOptions, ProductItem } from '@/types/api';
import { HTMLAttributes } from 'react';
import { useCompareStore } from '@/store/useCompareStore';
import { useRouter } from 'next/navigation';
import CompareDialog from '@/components/Dialog/CompareDialog';

interface ProductBtnsProps extends HTMLAttributes<HTMLDivElement> {
  order: OrderOptions;
  productId: number;
  categoryName: string;
  productName: string;
  productImageUrl: string;
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
  ...props
}: ProductBtnsProps) => {
  const router = useRouter();
  const { products, addProduct } = useCompareStore();
  const { open } = useDialog();
  const { openDialog } = useDialogStore();

  const handleCompareClick = () => {
    if (products.length < 2) {
      addProduct(product, () => {});
    } else {
      openDialog({
        dialogName: 'compare-dialog',
        dialogContent: (
          <CompareDialog
            products={products}
            newProduct={product}
            onReplace={(replaceProductId: number) => {
              addProduct(product, (onReplaceCallback) => onReplaceCallback(replaceProductId));
              router.push('/compare');
            }}
          />
        ),
      });
    }
  };

  return (
    <div className={cn('flex-between-center flex-col gap-3 md:flex-row', className)} {...props}>
      <Button className='w-full md:basis-18/31 lg:w-0' onClick={handleCompareClick}>
        다른 상품과 비교하기
      </Button>
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
