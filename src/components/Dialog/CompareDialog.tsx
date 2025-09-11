import useDialog from '@/hooks/useDialog';
import { useCompareStore } from '@/store/useCompareStore';
import { CompareDialogProps } from '@/types/dialogProps.types';
import { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from './core/DialogComponents';
import { Button } from '../Button/Button';

const CompareDialog = ({ products, newProduct }: CompareDialogProps) => {
  const { setComparisonProducts } = useCompareStore();
  const { open, close } = useDialog();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleReplaceClick = () => {
    if (selectedProductId !== null) {
      const selectedProduct = products.find((p) => p?.id === selectedProductId);
      if (selectedProduct) {
        setComparisonProducts([selectedProduct, newProduct]);
      }
      close();

      setTimeout(() => {
        open({
          dialogName: 'compare-confirmation-dialog',
        });
      }, 500);
    }
  };

  return (
    <DialogContent className='rounded-x5 flex h-[377px] w-[335px] flex-col items-center justify-center gap-10 border border-gray-200 md:h-[453px] md:w-125'>
      <DialogHeader>
        <DialogTitle className='text-center'>
          {`'${newProduct.name}'`}
          <br />
          어떤 상품과 비교할까요?
        </DialogTitle>
      </DialogHeader>

      <div className='flex w-[290px] flex-col gap-3 md:w-105'>
        {products.map((product) => (
          <Button
            key={product?.id}
            onClick={() => setSelectedProductId(product?.id || null)}
            className='h-[50px] w-full md:h-15'
            state={selectedProductId === product?.id ? 'default' : 'disabled'}
            intent='secondary'
          >
            {product?.name}
          </Button>
        ))}
      </div>

      <Button
        onClick={handleReplaceClick}
        disabled={selectedProductId === null}
        className='h-[55px] w-full md:h-[67px] md:w-105'
      >
        비교하기
      </Button>
    </DialogContent>
  );
};

export default CompareDialog;
