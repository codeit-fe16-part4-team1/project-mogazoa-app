import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 조건부 class 처리 + Tailwind 중복 class 정리
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
