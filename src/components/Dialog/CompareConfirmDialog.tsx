'use client';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog/core/DialogComponents';
import { Button } from '../Button/Button';

interface CompareConfirmDialogProps {
  onNavigate: () => void;
}

const CompareConfirmDialog = ({ onNavigate }: CompareConfirmDialogProps) => {
  const handleNavigateClick = () => {
    onNavigate();
  };
  return (
    <DialogContent className='rounded-x5 flex h-52 w-[335px] flex-col items-center justify-center border border-gray-200 md:h-[263px] md:w-125'>
      <DialogHeader>
        <DialogTitle className='text-center'>
          비교 상품이 교체되었습니다. <br /> 바로 확인해 보시겠어요?
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

export default CompareConfirmDialog;
