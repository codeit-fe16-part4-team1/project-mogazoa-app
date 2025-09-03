import { cn } from '@/lib/cn';
import { forwardRef, TextareaHTMLAttributes, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  watchValue?: string;
  maxLength: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, placeholder, register, error, maxLength, watchValue, ...rest }, ref) => {
    //watchValue가 없을때만 변경
    const [currentLength, setCurrentLength] = useState(0);
    const [isDirty, setIsDirty] = useState(() => {
      if (watchValue === undefined) return false;
      if (watchValue.length === 0) return false;
      return true;
    });

    const currentWatchLength = watchValue?.length || currentLength;

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // 최초 입력 시에만 한 번 상태 변경
      if (!isDirty) {
        setIsDirty(true);
      }
      // 글자 길이 실시간 변경
      if (e.target.value.length > maxLength) {
        e.target.value = e.target.value.slice(0, maxLength);
      }
      // watch가 없을 경우 state값 직접 업데이트
      if (watchValue !== 'undefined') {
        setCurrentLength(e.target.value.length);
      }
    };

    const TextAreaRegister = {
      ...register,
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        handleTextAreaChange(e);
        register?.onChange?.(e);
      },
    };

    const errorState = isDirty ? !!error : 'undefined';

    const ERROR_STATE_STYLES = {
      text: {
        undefined: 'text-gray-600',
        false: 'text-primary-orange-500',
        true: 'text-state-error',
      },
      border: {
        undefined: 'border-gray-600',
        false: 'border-primary-orange-500',
        true: 'border-state-error',
      },
    };

    const TEXTAREA_CONTAINER_STYLES = cn(
      'flex w-full flex-col gap-2 rounded-lg border-1 border-gray-300 p-3 md:p-5',
      ERROR_STATE_STYLES.border[`${errorState}`],
    );

    const TEXTAREA_STYLES = cn(
      'text-body2 md:text-body1 resize-none outline-0',
      'focus-within:placeholder:text-transparent',
      'placeholder:text-gray-600',
    );

    const LENGTH_INFO_STYLES = cn('text-body2 text-right');

    return (
      <div className={TEXTAREA_CONTAINER_STYLES}>
        <textarea
          ref={ref}
          id={id}
          className={TEXTAREA_STYLES}
          placeholder={placeholder}
          {...TextAreaRegister}
          {...rest}
        />
        <p className={LENGTH_INFO_STYLES}>{`${currentWatchLength}/${maxLength}`}</p>
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';
