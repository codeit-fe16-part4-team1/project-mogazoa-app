import clsx from 'clsx';
import { forwardRef, TextareaHTMLAttributes, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  className?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  watchValue?: string;
  isSubmitted?: boolean;
  maxLength: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { id, className, placeholder, register, error, isSubmitted, maxLength, watchValue, ...rest },
    ref,
  ) => {
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

    const errorState = isDirty || isSubmitted ? !!error : 'undefined';

    const ERROR_STATE_STYLES = {
      text: {
        undefined: 'text-gray-600',
        false: 'text-primary-orange-500',
        true: 'text-state-error',
      },
      border: {
        undefined: 'border-gray-300',
        false: 'border-primary-orange-500',
        true: 'border-state-error',
      },
    };

    const TEXTAREA_STYLES = clsx(
      'w-full',
      'text-body2 md:text-body1 resize-none outline-0',
      'focus-within:placeholder:text-transparent',
      'placeholder:text-gray-600',
      'rounded-lg border-1 border-gray-300 p-3 md:p-5 pb-8 md:pb-10',
      'field-sizing-content',
      'block',
      ERROR_STATE_STYLES.border[`${errorState}`],
    );

    const LENGTH_INFO_STYLES = clsx(
      'absolute bottom-3 md:bottom-5 right-3 md:right-5',
      'text-body2 text-right',
      'text-gray-700',
    );

    return (
      <div className='relative w-full'>
        <textarea
          ref={ref}
          id={id}
          className={clsx(TEXTAREA_STYLES, className)}
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
