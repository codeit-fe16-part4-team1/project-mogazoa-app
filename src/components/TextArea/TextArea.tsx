import { cn } from '@/lib/cn';
import { forwardRef, TextareaHTMLAttributes, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  maxLength: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, placeholder, register, maxLength, ...rest }, ref) => {
    const [currentLength, setCurrentLength] = useState(0);

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.value.length > maxLength) {
        e.target.value = e.target.value.slice(0, maxLength);
      }
      setCurrentLength(e.target.value.length);
    };

    const TextAreaRegister = {
      ...register,
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        handleTextAreaChange(e);
        register?.onChange?.(e);
      },
    };

    return (
      <div className='flex w-full flex-col gap-2 rounded-lg border-1 border-gray-300 p-3 md:p-5'>
        <textarea
          ref={ref}
          className={cn('text-body2 md:text-body1 resize-none outline-0', className)}
          placeholder={placeholder}
          {...TextAreaRegister}
          {...rest}
        />
        <p className='text-body2 text-right text-gray-700'>{`${currentLength}/${maxLength}`}</p>
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';
