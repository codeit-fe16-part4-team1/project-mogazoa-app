'use client';

import { Button } from '@/components/Button/Button';
import useDialog from '@/hooks/useDialog';

const DialogTest = () => {
  const { open } = useDialog();

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <Button onClick={() => open({ dialogName: 'test-dialog' })}>테스트 다이얼로그 오픈</Button>
      </div>
      <div>
        <Button
          size='S'
          onClick={() =>
            open({
              dialogName: 'review-form-dialog',
              dialogProps: {
                mode: 'create',
                productId: 1383,
                categoryName: '카테고리명',
                productName: '상품명',
                productImageUrl: 'https://picsum.photos/id/1020/600/400',
              },
            })
          }
        >
          리뷰 생성 다이얼로그 오픈
        </Button>
      </div>
      <div>
        <Button
          size='S'
          onClick={() =>
            open({
              dialogName: 'review-form-dialog',
              dialogProps: {
                mode: 'edit',
                productId: 1383,
                reviewId: 123,
                categoryName: '카테고리명',
                productName: '상품명',
                productImageUrl: 'https://picsum.photos/id/1020/600/400',
                rating: 2,
                content: '리뷰내용',
                reviewImages: [{ id: 1, source: 'https://picsum.photos/id/1020/600/400' }],
              },
            })
          }
        >
          리뷰 편집 다이얼로그 오픈
        </Button>
      </div>
    </div>
  );
};

export default DialogTest;
