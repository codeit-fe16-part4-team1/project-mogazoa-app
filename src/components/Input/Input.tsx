'use client';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';
import z from 'zod';

interface Input {
  minLength?: number;
  maxLength: number;
}

export const InputSchema = ({ minLength = 1, maxLength }: Input) => {
  return z
    .string()
    .min(1, '필수 입력 항목입니다') // min은 고정
    .min(minLength, `${minLength}자 이상으로 입력하세요`)
    .max(maxLength, `${maxLength}자 이하로 입력하세요`);
};

interface InputProps extends VariantProps<typeof inputVariants> {
  id?: string;
  className?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
  autoComplete?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  watchValue?: string;
}

const inputVariants = cva(
  'rounded-lg border-1 outline-0 placeholder:text-gray-600 focus-within:placeholder:text-transparent w-full',
  {
    variants: {
      size: {
        L: 'p-5 text-body1',
        S: 'p-3 text-body2',
      },
    },
    defaultVariants: {
      size: 'L',
    },
  },
);

const Input = ({
  id,
  className,
  type,
  placeholder,
  autoComplete,
  register,
  error,
  watchValue,
  size,
  ...rest
}: InputProps) => {
  const [isDirty, setIsDirty] = useState(() => {
    if (watchValue === undefined) return false;
    if (watchValue.length === 0) return false;
    return true;
  });
  const errorState = isDirty ? !!error : 'undefined';

  const InputRegister = {
    ...register,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      if (!isDirty) {
        setIsDirty(true); // 최초 입력 시에만 한 번 상태 변경
      }
      if (register) {
        register.onChange?.(e);
      }
    },
  };

  const ERROR_STATE_STYLES = {
    undefined: 'border-gray-600',
    false: 'border-primary-orange-500',
    true: 'border-state-error',
  };

  const INPUT_STYLES = cn(inputVariants({ size }), ERROR_STATE_STYLES[`${errorState}`], className);

  return (
    <input
      id={id}
      className={INPUT_STYLES}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      {...InputRegister}
      {...rest}
    />
  );
};

export default Input;
