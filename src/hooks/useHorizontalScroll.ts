import { useRef, useState, useEffect } from 'react';

const SCROLL_AMOUNT_RATIO = 0.9;

export const useHorizontalScroll = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateScrollState = () => {
      const scrollLeft = container.scrollLeft;
      const clientWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;

      setCanScrollPrev(scrollLeft > 0);
      setCanScrollNext(scrollLeft + clientWidth < scrollWidth);
    };

    container.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);

    // 초기 상태 업데이트
    updateScrollState();

    return () => {
      container.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const scrollToDirection = (direction: 'next' | 'prev') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * SCROLL_AMOUNT_RATIO;

    if (direction === 'prev') {
      container.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    } else {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return {
    scrollContainerRef,
    canScrollPrev,
    canScrollNext,
    scrollToDirection,
  };
};
