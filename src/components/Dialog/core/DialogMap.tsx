import { IDialogComponents } from '@/types/dialog.types';
import TestDialog from '../TestDialog';
import TestInnerDialog from '../TestInnerDialog';
import {
  ReviewFormDialogProps,
  ProfileEditDialogProps,
  ProfileFollowDialogProps,
  TestInnerDialogProps,
} from '@/types/dialogProps.types';
import ReviewFormDialog from '../ReviewFormDialog';
import ProfileEditDialog from '@/app/(user)/components/ProfileSection/ProfileEditDialog';
import ProfileFollowDialog from '@/app/(user)/components/ProfileSection/ProfileFollowDialog';

/**
 * 모든 다이얼로그 컴포넌트를 매핑하는 객체.
 * openDialog 함수에서 'dialogName'으로 참조하여 해당 다이얼로그를 렌더링하는 데 사용됩니다.
 * 새로운 다이얼로그를 추가하려면 여기에 '키(dialogName)'와 '값(Props를 받아 React 컴포넌트를 반환하는 콜백)'을 추가해야 합니다.
 * Props는 `dialogProps.types.ts` 파일에 작성되어야 합니다.
 * @type {IDialogComponents}
 * @example
 * 예시: 'my-new-dialog' 다이얼로그 컴포넌트 추가
 * import MyNewDialog from './MyNewDialog';
 * import { MyNewDialogProps } from '@/types/dialogProps.types'
 * export const DIALOG_COMPONENTS = {
 *   ...,
 *   'my-new-dialog': (props: MyNewDialogProps) => <MyNewDialog />,
 * }
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DIALOG_COMPONENTS: IDialogComponents<any> = {
  'test-dialog': () => <TestDialog />,
  'test-inner-dialog': (props: TestInnerDialogProps) => <TestInnerDialog {...props} />,
  'review-form-dialog': (props: ReviewFormDialogProps) => <ReviewFormDialog {...props} />,
  'profile-edit-dialog': (props: ProfileEditDialogProps) => <ProfileEditDialog {...props} />,
  'profile-follow-dialog': (props: ProfileFollowDialogProps) => <ProfileFollowDialog {...props} />,
} as const;
