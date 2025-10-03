'use client';

import { useEffect } from 'react';

import { Dialog } from '@/components/Dialog/core/DialogComponents';
import useDialogStore from '@/store/useDialogStore';

const GlobalDialog = () => {
  const { dialogs, isOpen, isClosing, setIsClosing, closeDialog } = useDialogStore();

  const activeDialog = dialogs.at(-1);

  useEffect(() => {
    const handlePopState = (_e: PopStateEvent) => {
      if (isClosing) {
        setIsClosing(false);
        return;
      }

      if (dialogs.length > 0) {
        closeDialog();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [dialogs, closeDialog, isClosing, setIsClosing]);

  const handleOpenChange = () => {
    if (activeDialog && !activeDialog.isBlockBackgroundClose) closeDialog();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {activeDialog?.dialogContent}
    </Dialog>
  );
};

export default GlobalDialog;
