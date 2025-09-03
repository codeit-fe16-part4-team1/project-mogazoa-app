import { Button } from '@/components/Button/Button';
import { cn } from '@/lib/cn';
import { HTMLAttributes } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ProductBtnsProps extends HTMLAttributes<HTMLDivElement> {}

const ProductBtns = ({ className, ...props }: ProductBtnsProps) => {
  return (
    <div className={cn('flex-between-center flex-col gap-3 md:flex-row', className)} {...props}>
      <Button className='w-full md:basis-18/31 lg:w-0'>다른 상품과 비교하기</Button>
      <Button className='w-full md:basis-13/31 lg:w-0' intent='secondary'>
        리뷰 작성하기
      </Button>
    </div>
  );
};

export default ProductBtns;
