'use client'; // 클라이언트 컴포넌트로 지정

import CompareBar from '@/components/CompareBar/CompareBar'; // 실제 경로에 맞게 수정하세요.
import { ProductItem } from '@/types/api';

const CompareTestPage = () => {
  const handleProductSelect = (product: ProductItem) => {
    console.log('Selected product:', product);
  };

  const handleProductRemove = (product: ProductItem) => {
    console.log('상품이 제거되었습니다:', product.name);
  };

  return (
    <div className='flex min-h-screen flex-col items-center p-8'>
      <h1 className='text-h1-bold mb-4'>CompareBar Test</h1>
      <div className='flex gap-8'>
        <div className='flex w-[340px] items-center justify-center'>
          <CompareBar onSelectProduct={handleProductSelect} onRemoveProduct={handleProductRemove} />
        </div>

        <div className='flex w-[340px] items-center justify-center'>
          <CompareBar onSelectProduct={handleProductSelect} onRemoveProduct={handleProductRemove} />
        </div>
      </div>
    </div>
  );
};

export default CompareTestPage;
