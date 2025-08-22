import { cn } from '@/lib/cn';

interface HintProps {
  className?: string;
  children?: React.ReactNode;
}

const FormHint = ({ className, children }: HintProps) => {
  return <p className={cn('text-red-500 text-sm mt-1', className)}>{children}</p>;
};

export default FormHint;
