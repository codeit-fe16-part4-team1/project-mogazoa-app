import useDialogStore from '@/store/useDialogStore';
import { ProductItem } from '@/types/api';
import { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from './core/DialogComponents';
import { Button } from '../Button/Button';
import CompareConfirmDialog from './CompareConfirmDialog';

export interface CompareDialogProps {
  products: ProductItem[];
  newProduct: ProductItem;
  onReplace: (replaceProductId: number) => void;
}

const CompareDialog = ({ products, newProduct, onReplace }: CompareDialogProps) => {
  const { openDialog, closeDialog } = useDialogStore();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleReplaceClick = () => {
    if (selectedProductId !== null) {
      onReplace(selectedProductId);
      closeDialog();

      openDialog({
        dialogName: 'compare-confirmation-dialog',
        dialogContent: <CompareConfirmDialog />,
      });
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
            key={product.id}
            onClick={() => setSelectedProductId(product.id)}
            className='h-[50px] w-full md:h-15'
            state={selectedProductId === product.id ? 'default' : 'disabled'}
            intent='secondary'
          >
            {product.name}
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
