import { cn } from '@/lib/cn';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
  htmlFor?: string;
  className?: string;
}

const FormLabel = ({ children, htmlFor, className = '', ...rest }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={cn('block text-sm font-medium', className)} {...rest}>
      {children}
    </label>
  );
};

export default FormLabel;
