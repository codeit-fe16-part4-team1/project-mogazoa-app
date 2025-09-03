import { ProfileEditMutationData } from '@/app/(user)/components/ProfileSection/components/ProfileEditButton';

/**
 * 모든 DialogProps를 정의하는 파일
 */
export interface TestInnerDialogProps {
  id: number;
}

export interface TestTest {
  test: string;
}

export interface ProfileEditDialogProps {
  imageUrl: string;
  nickname: string;
  description: string;
  onSubmitSuccess: (updatedData: ProfileEditMutationData) => void;
}
