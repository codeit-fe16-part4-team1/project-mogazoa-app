import { cn } from '@/lib/cn';
import { motion, HTMLMotionProps, Variants } from 'framer-motion'; // framer-motion으로 변경
import { cva, VariantProps } from 'class-variance-authority';

const circleIndicatorVariants = cva('h-2 w-2 rounded-full', {
  variants: {
    dotColor: {
      default: 'bg-gray-400',
      primary: 'bg-primary-orange-500',
    },
  },
  defaultVariants: {
    dotColor: 'default',
  },
});

const containerVariants: Variants = {
  initial: {
    transition: {
      staggerChildren: 0.2, // 자식 요소의 애니메이션 시작 간격
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const dotVariants: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [0, -10, 0],
    transition: {
      repeat: Infinity,
      repeatDelay: 0.4,
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};

export interface ThreeDotsIndicatorProps
  extends HTMLMotionProps<'div'>,
    VariantProps<typeof circleIndicatorVariants> {}

const ThreeDotsIndicator = ({ className, dotColor, ...props }: ThreeDotsIndicatorProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial='initial'
      animate='animate'
      className={cn('flex-center gap-1', className)}
      {...props}
    >
      <motion.span variants={dotVariants} className={cn(circleIndicatorVariants({ dotColor }))} />
      <motion.span variants={dotVariants} className={cn(circleIndicatorVariants({ dotColor }))} />
      <motion.span variants={dotVariants} className={cn(circleIndicatorVariants({ dotColor }))} />
    </motion.div>
  );
};

export { ThreeDotsIndicator, circleIndicatorVariants };
