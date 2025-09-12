// lib/validations.ts
import { z } from 'zod';

interface TextArea {
  minLength?: number;
  maxLength: number;
  required?: boolean;
}

export const TextAreaSchema = ({ minLength = 1, maxLength }: TextArea) => {
  return z
    .string()
    .min(1, '필수 입력 항목입니다') // min은 고정
    .min(minLength, `${minLength}자 이상으로 입력하세요`)
    .max(maxLength, `${maxLength}자 이하로 입력하세요`);
};

interface TextAreaOptional {
  maxLength: number;
}

export const TextAreaOptionalSchema = ({ maxLength }: TextAreaOptional) => {
  return z
    .string() //
    .max(maxLength, `${maxLength}자 이하로 입력하세요`)
    .optional();
};
