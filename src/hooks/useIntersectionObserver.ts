import { useEffect, useRef } from 'react';

/**
 * 특정 요소가 뷰포트와 교차하는지 감지하는 커스텀 훅.
 *
 * @param {() => void} callback - 요소가 뷰포트에 나타날 때 실행될 콜백.
 * @returns {React.RefObject<Element | null>} - 감지할 DOM 요소를 연결할 Ref 객체.
 */
export const useIntersectionObserver = (callback: () => void) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) callback();
      },
      {
        root: null, // 뷰포트를 기준으로 감지
        threshold: 0.5, // 요소의 50%가 뷰포트에 보일 때 감지
      },
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [callback]);

  return observerRef;
};
