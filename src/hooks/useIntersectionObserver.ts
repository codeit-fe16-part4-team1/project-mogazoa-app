import { useEffect, useRef } from 'react';

/**
 * 특정 요소가 뷰포트와 교차하는지 감지하는 커스텀 훅.
 *
 * @param {() => void} callback - 요소가 뷰포트에 나타날 때 실행될 콜백.
 * @returns {React.RefObject<Element | null>} - 감지할 DOM 요소를 연결할 Ref 객체.
 */
export const useIntersectionObserver = (
  callback: () => void,
  options?: {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number;
  },
) => {
  const observerRef = useRef(null);

  useEffect(() => {
    if (options?.root === null && options?.root !== undefined) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) callback();
      },
      {
        root: options?.root || null, // 뷰포트를 기준으로 감지
        threshold: options?.threshold || 0.5, // 요소의 50%가 뷰포트에 보일 때 감지
        rootMargin: options?.rootMargin || '0px',
      },
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [callback, options]);

  return observerRef;
};
