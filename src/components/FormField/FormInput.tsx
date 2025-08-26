import { cn } from '@/lib/cn';
import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  className?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
  autoComplete?: string;
  register?: UseFormRegisterReturn;
}

const FormInput = ({
  id,
  className,
  type,
  placeholder,
  autoComplete,
  register,
  ...rest
}: InputProps) => {
  return (
    <input
      id={id}
      className={cn('w-full rounded-md border p-2', className)}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      {...register}
      {...rest}
    />
  );
};

export default FormInput;
