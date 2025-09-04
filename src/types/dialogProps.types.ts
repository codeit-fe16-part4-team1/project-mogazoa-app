import { DialogContentProps } from '@radix-ui/react-dialog';
import { ReviewImage } from './api';

/**
 * 모든 DialogProps를 정의하는 파일
 */
export interface TestInnerDialogProps {
  id: number;
}

export interface TestTest {
  test: string;
}

export interface ReviewFormDialogProps extends DialogContentProps {
  mode: 'create' | 'edit';
  productId: number;
  reviewId?: number;
  categoryName: string;
  productName: string;
  productImageUrl: string;
  rating?: number;
  reviewContent?: string;
  reviewImages?: ReviewImage[];
}
