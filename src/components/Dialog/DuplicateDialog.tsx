'use client';

import useDialog from '@/hooks/useDialog';

import { Button } from '../Button/Button';
import { DialogContent, DialogHeader, DialogTitle } from './core/DialogComponents';

const DuplicateDialog = () => {
  const { closeAllAndRoute } = useDialog();

  const handleNavigateClick = () => {
    closeAllAndRoute('/compare');
  };

  return (
    <DialogContent className='rounded-x5 flex h-52 w-[335px] flex-col items-center justify-center gap-10 border border-gray-200 md:h-[263px] md:w-125'>
      <DialogHeader>
        <DialogTitle className='text-center'>
          이미 비교 목록에 있는 상품입니다. <br /> 바로 확인해 보시겠어요?
        </DialogTitle>
      </DialogHeader>
      <div>
        <Button onClick={handleNavigateClick} className='h-[50px] w-[290px] md:h-[67px] md:w-105'>
          바로가기
        </Button>
      </div>
    </DialogContent>
  );
};
export default DuplicateDialog;
