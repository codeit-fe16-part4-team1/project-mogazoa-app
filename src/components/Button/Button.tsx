import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

// cva로 variant, size 관리
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-colors  transition-all duration-900 cursor-pointer text-body1-medium lg:text-sub-headline-medium ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      intent: {
        primary: 'bg-primary-orange-600',
        secondary: 'bg-white border border-primary-orange-500',
        tertiary: 'bg-white border border-gray-700',
      },
      size: {
        S: 'w-[335px] h-[50px]',
        M: 'w-[335px] h-[50px] md:w-[440px] md:h-[55px]',
        L: 'w-[335px] h-[50px] md:w-[440px] md:h-[55px] lg:w-[640px] lg:h-[60px] lg:py-5 lg:text-sub-headline-medium',
        auto: '',
      },
      state: {
        default: '',
        active: '',
        disabled: '',
      },
    },

    compoundVariants: [
      // === 텍스트 색상 ===
      { intent: 'primary', state: 'default', class: 'text-white' },
      { intent: 'secondary', state: 'default', class: 'text-primary-orange-500' },
      { intent: 'tertiary', state: 'default', class: 'text-gray-700' },

      // hover 스타일
      { intent: 'primary', state: 'default', class: 'hover:bg-primary-orange-700' },
      { intent: 'secondary', state: 'default', class: 'hover:bg-primary-orange-500/50' },
      { intent: 'tertiary', state: 'default', class: 'hover:bg-gray-500/50' },

      // primary-active 스타일
      {
        intent: 'primary',
        state: 'active',
        class: 'bg-white text-primary-orange-600 border border-primary-orange-600',
      },

      //disabled 스타일
      { intent: 'primary', state: 'disabled', class: 'bg-gray-200 text-gray-500' },
      { intent: 'secondary', state: 'disabled', class: 'border border-gray-300 text-gray-500' },
      { intent: 'tertiary', state: 'disabled', class: 'border border-gray-400 text-gray-500' },
    ],
    defaultVariants: {
      intent: 'primary',
      state: 'default',
      size: 'auto',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  disabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, state, disabled, ...props }, ref) => {
    const effectiveState = disabled ? 'disabled' : state;
    return (
      <button
        ref={ref}
        type={(props as React.ButtonHTMLAttributes<HTMLButtonElement>).type || 'button'}
        className={cn(buttonVariants({ intent, size, state: effectiveState }), className)}
        disabled={disabled}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
