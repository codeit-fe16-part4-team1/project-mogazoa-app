import { DialogContentProps } from '@radix-ui/react-dialog';
import { OrderOptions, ReviewImage } from './api';
import { Follows } from '@/api/user/getUserFollowsAPI';
import { ProfileEditMutationData } from '@/app/(user)/components/ProfileSection/components/ProfileEditButton';
import { ProductItem } from '@/types/api';

/**
 * 모든 DialogProps를 정의하는 파일
 */
export interface TestInnerDialogProps {
  id: number;
}

export interface TestTest {
  test: string;
}

export interface ProductFormDialogProps extends DialogContentProps {
  mode: 'create' | 'edit';
  productId?: number;
  categoryId?: number;
  imageUrl?: string;
  productName?: string;
  productDescription?: string;
}

export interface ReviewFormDialogProps extends DialogContentProps {
  mode: 'create' | 'edit';
  order: OrderOptions;
  productId: number;
  reviewId?: number;
  categoryName: string;
  productName: string;
  productImageUrl: string;
  rating?: number;
  reviewContent?: string;
  reviewImages?: ReviewImage[];
}

export interface ProfileEditDialogProps {
  imageUrl: string;
  nickname: string;
  description: string;
  onSubmitSuccess: (updatedData: ProfileEditMutationData) => Promise<void>;
}

export interface ProfileFollowDialogProps {
  profileId: number;
  followsCount: number;
  type: Follows;
}

export interface CompareDialogProps {
  products: (ProductItem | null)[];
  newProduct: ProductItem;
}

export interface CategoryMismatchDialogProps {
  newProduct: ProductItem;
}
