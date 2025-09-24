import { useEffect, useState } from 'react';

interface UseDelayedRenderProps {
  condition?: boolean;
  delay?: number;
}

export const useDelayedRender = ({ condition = true, delay = 300 }: UseDelayedRenderProps = {}) => {
  // SSR에서는 true (스켈레톤 표시), 클라이언트에서는 false (딜레이 적용)
  const [shouldRender, setShouldRender] = useState(() => typeof window === 'undefined');

  useEffect(() => {
    if (condition) {
      const timer = setTimeout(() => setShouldRender(true), delay);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(false);
    }
  }, [condition, delay]);

  return shouldRender;
};
