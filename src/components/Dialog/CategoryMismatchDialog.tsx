import useDialog from '@/hooks/useDialog';
import { useCompareStore } from '@/store/useCompareStore';
import useDialogStore from '@/store/useDialogStore';
import { CategoryMismatchDialogProps } from '@/types/dialogProps.types';

import { Button } from '../Button/Button';
import { DialogContent, DialogHeader, DialogTitle } from './core/DialogComponents';

const CategoryMismatchDialog = ({ newProduct, categoryName }: CategoryMismatchDialogProps) => {
  const { setComparisonProducts } = useCompareStore();
  const { open } = useDialog();
  const { closeDialog } = useDialogStore();

  const handleResetAndCompare = () => {
    setComparisonProducts([newProduct]);
    closeDialog();
    open({
      dialogName: 'compare-confirmation-dialog',
    });
  };
  return (
    <DialogContent className='rounded-x5 flex h-70 w-85 flex-col items-center justify-center gap-8 border border-gray-200 md:h-90 md:w-125'>
      <DialogHeader>
        <DialogTitle className='flex flex-col gap-3 text-center'>
          <div>{`'${categoryName}'`}의 상품 비교 중입니다.</div>
          <div className='text-body2-medium md:text-sub-headline-medium'>
            기존 비교 목록을 초기화하고
            <br />이 상품으로 새로 시작하시겠어요?
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className='flex w-[290px] flex-col gap-3 md:w-105'>
        <Button onClick={handleResetAndCompare} className='h-[50px] w-[290px] md:h-[67px] md:w-105'>
          새로 비교하기
        </Button>
        <Button
          onClick={closeDialog}
          intent='secondary'
          className='h-[50px] w-[290px] md:h-[67px] md:w-105'
        >
          돌아가기
        </Button>
      </div>
    </DialogContent>
  );
};
export default CategoryMismatchDialog;
