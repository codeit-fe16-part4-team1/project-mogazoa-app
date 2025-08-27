// lib/validations.ts
import { z } from 'zod';

export const TextAreaSchema = (maxLength: number) => {
  return z
    .string()
    .min(1, '필수 입력 항목입니다') // min은 고정
    .max(maxLength, `${maxLength}자 이하로 입력하세요`);
};
