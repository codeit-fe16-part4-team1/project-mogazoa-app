import { useEffect, useState } from 'react';

import { toast } from 'cy-toast';

import Toast from '@/components/Toast/Toast';

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    try {
      const urlToCopy = window.location.href;
      await navigator.clipboard.writeText(urlToCopy);
      setIsCopied(true);
      toast.run(({ isClosing, isOpening, index }) => (
        <Toast variant='success' isOpening={isOpening} isClosing={isClosing} index={index}>
          {'링크가 클립 보드에 복사되었습니다 :)'}
        </Toast>
      ));
    } catch (error) {
      console.log(error);
      toast.run(({ isClosing, isOpening, index }) => (
        <Toast variant='error' isOpening={isOpening} isClosing={isClosing} index={index}>
          {'클립 보드에 복사에 실패했습니다 :('}
        </Toast>
      ));
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return [isCopied, copy];
};

export default useCopyToClipboard;
