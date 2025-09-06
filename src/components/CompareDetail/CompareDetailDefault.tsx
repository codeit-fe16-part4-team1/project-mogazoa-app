'use client';

import CompareHuman from '@/assets/icons/compareHuman.svg';

interface CompareDetailDefaultProps {
  placeholder: string;
}

const CompareDetailDefault = ({ placeholder }: CompareDetailDefaultProps) => {
  const message = `비교할 상품${placeholder}를 입력해 주세요`;
  return (
    <div className='bg-gray-150 rounded-x5 flex h-[282px] w-[290px] flex-col items-center justify-center gap-7 lg:w-[405px]'>
      <CompareHuman className='w-40' />
      <span className='text-body1-medium text-gray-500'>{message}</span>
    </div>
  );
};

export default CompareDetailDefault;
