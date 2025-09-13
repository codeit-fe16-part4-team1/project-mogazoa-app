import clsx from 'clsx';
import IconInfo from '@/assets/icons/icon_toast_info.svg';
import IconSuccess from '@/assets/icons/icon_toast_success.svg';
import IconError from '@/assets/icons/icon_toast_fail.svg';
import { cn } from '@/lib/cn';

type Variant = 'info' | 'success' | 'error';

interface Props {
  variant: Variant;
  isClosing: boolean; // 닫히는 중 여부 (true면 닫히는 애니메이션)
  isOpening: boolean; // 열리는 중 여부 (true면 열리는 애니메이션)
  index: number; // 토스트 표시 순서 (최신이 0)
  children: React.ReactNode;
  className?: string;
}

const Toast = ({ variant, isClosing, isOpening, index, children, className }: Props) => {
  const iconMap = {
    info: IconInfo,
    success: IconSuccess,
    error: IconError,
  };

  const IconComponent = iconMap[variant];

  const containerStyle = clsx(
    'fixed left-1/2 -translate-x-1/2 z-toast',
    'flex flex-row gap-4 items-center',
    'rounded-lg shadow-lg',
    'text-body1 md:text-lg lg:text-xl whitespace-nowrap',
    'top-25 md:top-35 lg:top-40',
    'py-3 px-4 md:py-4 md:px-5',
    'select-none',
    'transition-all duration-200 ease-in-out',
  );

  const animationStyle = clsx(
    isClosing && index < 3 && 'animation-slide-down-out pointer-events-none',
    isOpening && 'animation-slide-down-in',
    index === 1 && 'translate-y-2 scale-90',
    index === 2 && 'translate-y-4 scale-80',
    index >= 3 && 'translate-y-5 scale-70 opacity-0',
  );

  const variantStyle = {
    info: clsx('bg-gray-50 text-gray-500', 'border-1 border-gray-500'),
    success: clsx(
      'bg-primary-orange-100 text-primary-orange-300',
      'border-1 border-primary-orange-200',
    ),
    error: clsx('bg-red-50 text-red-800', 'border-1 border-red-300'),
  };

  return (
    <div className={cn(containerStyle, variantStyle[variant], animationStyle, className)}>
      <IconComponent />
      {children}
    </div>
  );
};

export default Toast;
