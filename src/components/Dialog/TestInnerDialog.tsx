'use client';

import { Button } from '@/components/Button/Button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog/core/DialogComponents';
import useDialog from '@/hooks/useDialog';
import { TestInnerDialogProps } from '@/types/dialogProps.types';

const TestInnerDialog = ({ id }: TestInnerDialogProps) => {
  const { closeAll } = useDialog();

  const innerDialogContent = (
    <DialogContent showCloseButton={true}>
      <DialogHeader>
        <DialogTitle>내부 다이얼로그</DialogTitle>
        <DialogDescription>
          기본 동작인 백그라운드 클릭 시 닫힘이 방지되어있습니다.
        </DialogDescription>
        <p>Props 전달 테스트: {id}</p>
        <DialogFooter className='flex-between w-full'>
          <DialogClose asChild className='w-full'>
            <Button size='S'>이전</Button>
          </DialogClose>
          <Button className='w-full' size='S' onClick={() => closeAll()}>
            전체 닫기
          </Button>
        </DialogFooter>
      </DialogHeader>
    </DialogContent>
  );

  return innerDialogContent;
};

export default TestInnerDialog;
