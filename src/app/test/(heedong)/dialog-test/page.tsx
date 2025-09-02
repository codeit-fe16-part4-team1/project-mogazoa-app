'use client';

import { Button } from '@/components/Button/Button';
import useDialog from '@/hooks/useDialog';

const DialogTest = () => {
  const { open } = useDialog();

  return (
    <div>
      <Button onClick={() => open({ dialogName: 'test-dialog' })}>테스트 다이얼로그 오픈</Button>
    </div>
  );
};

export default DialogTest;
