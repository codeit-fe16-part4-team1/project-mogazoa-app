'use client';

import { Button } from '@/components/Button/Button';
import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogClose,
} from '@/components/Dialog/core/DialogComponents';
import useDialog from '@/hooks/useDialog';

const TestInnerDialog = () => {
  const { closeAll } = useDialog();

  const innerDialogContent = (
    <DialogContent showCloseButton={true}>
      <DialogHeader>
        <DialogTitle>내부 다이얼로그</DialogTitle>
        <DialogDescription>
          기본 동작인 백그라운드 클릭 시 닫힘이 방지되어있습니다.
        </DialogDescription>
        <div className='flex gap-4 justify-between items-center'>
          <DialogClose asChild>
            <Button className='grow'>이전</Button>
          </DialogClose>
          <Button className='grow' onClick={() => closeAll()}>
            전체 닫기
          </Button>
        </div>
      </DialogHeader>
    </DialogContent>
  );

  return innerDialogContent;
};

export default TestInnerDialog;
