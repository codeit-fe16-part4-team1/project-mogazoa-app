import { useState, useEffect } from 'react';

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    try {
      const urlToCopy = window.location.href;
      await navigator.clipboard.writeText(urlToCopy);
      setIsCopied(true);
      alert('클립보드 복사 완료');
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
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
