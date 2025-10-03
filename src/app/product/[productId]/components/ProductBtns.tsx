import { HTMLAttributes } from 'react';

import { toast } from 'cy-toast';

import { Button } from '@/components/Button/Button';
import Toast from '@/components/Toast/Toast';
import { useCategoryMap } from '@/hooks/useCategoryMap';
import useDialog from '@/hooks/useDialog';
import { cn } from '@/lib/cn';
import { useCompareStore } from '@/store/useCompareStore';
import { OrderOptions, ProductItem } from '@/types/api';

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
  const { getCategoryName } = useCategoryMap();

  const handleCompareClick = () => {
    const firstProduct = products.filter(Boolean)[0];
    const productCount = products.filter(Boolean).length;

    if (firstProduct && firstProduct.categoryId !== product.categoryId) {
      const categoryName = getCategoryName(firstProduct.categoryId) || '';
      open({
        dialogName: 'category-mismatch-dialog',
        dialogProps: {
          newProduct: product,
          categoryName: categoryName,
        },
      });
      return;
    }

    const isDuplicate = products.some((p) => p?.id === product.id);
    if (isDuplicate) {
      open({ dialogName: 'duplicate-dialog' });
      return;
    }

    if (productCount === 0) {
      addProduct(product);
      toast.run(({ isClosing, isOpening, index }) => (
        <Toast variant='success' isOpening={isOpening} isClosing={isClosing} index={index}>
          비교하기에 상품이 담겼습니다.
        </Toast>
      ));
    } else if (productCount === 1) {
      addProduct(product);
      open({
        dialogName: 'direct-compare-dialog',
      });
    } else if (productCount === 2) {
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
