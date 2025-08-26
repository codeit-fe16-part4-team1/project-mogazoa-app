import { cn } from '@/lib/cn';

interface HintProps {
  className?: string;
  children?: React.ReactNode;
}

const FormHint = ({ className, children }: HintProps) => {
  return <p className={cn('mt-1 text-sm text-red-500', className)}>{children}</p>;
};

export default FormHint;
