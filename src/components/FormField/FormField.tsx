import { cn } from '@/lib/cn';

interface FieldProps {
  children?: React.ReactNode;
  className?: string;
}

const FormField = ({ children, className }: FieldProps) => {
  return <div className={cn(className)}>{children}</div>;
};

export default FormField;
