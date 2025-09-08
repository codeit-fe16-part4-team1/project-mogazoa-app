import useDialogStore from '@/store/useDialogStore';
import { ProductItem } from '@/types/api';
import { useState } from 'react';
import { DialogClose, DialogContent, DialogTitle } from './core/DialogComponents';
import IconClose from '@/assets/icons/IconClose.svg';
import { Button } from '../Button/Button';

export interface CompareDialogProps {
  products: ProductItem[];
  newProduct: ProductItem;
  onReplace: (replaceProductId: number) => void;
}

const CompareDialog = ({ products, newProduct, onReplace }: CompareDialogProps) => {
  const { closeDialog } = useDialogStore();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleReplaceClick = () => {
    if (selectedProductId !== null) {
      onReplace(selectedProductId);
      closeDialog();
    }
  };

  return (
    <DialogContent className=''>
      <DialogClose asChild>
        <button className=''>
          <IconClose className='h-6 w-6 text-gray-400' onClick={closeDialog} />
        </button>
      </DialogClose>

      <DialogTitle className=''>
        {`'${newProduct.name}'`}
        <br />
        어떤 상품과 비교할까요?
      </DialogTitle>

      <div className=''>
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => setSelectedProductId(product.id)}
            className={`rounded-x5 w-full border-2 px-5 py-[18px] text-center text-gray-900 transition-colors ${selectedProductId === product.id ? 'border-primary-orange-400 bg-primary-orange-100 text-body1-bold' : 'text-body1-medium border-gray-300 hover:border-gray-500'}`}
          >
            {product.name}
          </button>
        ))}
      </div>

      <Button
        onClick={handleReplaceClick}
        disabled={selectedProductId === null}
        className='text-body1-bold h-[55px] w-full'
      >
        교체하기
      </Button>
    </DialogContent>
  );
};

export default CompareDialog;
