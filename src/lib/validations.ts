// lib/validations.ts
import { z } from 'zod';

interface TextArea {
  minLength?: number;
  maxLength: number;
  required?: boolean;
}

export const TextAreaSchema = ({ minLength = 1, maxLength, required = true }: TextArea) => {
  if (required) {
    return z
      .string()
      .min(minLength, `${minLength}자 이상으로 입력하세요`)
      .max(maxLength, `${maxLength}자 이하로 입력하세요`);
  } else {
    return z
      .string() //
      .max(maxLength, `${maxLength}자 이하로 입력하세요`)
      .optional(); // 필수가 아님
  }
};
