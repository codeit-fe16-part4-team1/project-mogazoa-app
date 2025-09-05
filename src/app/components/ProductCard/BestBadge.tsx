import { cn } from '@/lib/cn';

interface BestBadgeProps {
  rank: number;
  className?: string;
}

const BestBadge = ({ rank, className }: BestBadgeProps) => {
  return (
    <div
      className={cn(
        'rounded-x1 bg-primary-orange-500 flex h-6 w-6 items-center justify-center md:h-8 md:w-8',
        className,
      )}
    >
      <span className='text-caption-bold md:text-body1-bold text-white'>{rank}</span>
    </div>
  );
};

export default BestBadge;
