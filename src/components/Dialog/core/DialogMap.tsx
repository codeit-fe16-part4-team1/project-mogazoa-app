import TestDialog from '../TestDialog';
import TestInnerDialog from '../TestInnerDialog';

/**
 * 모든 다이얼로그 컴포넌트를 매핑하는 객체.
 * openDialog 함수에서 'dialogName'으로 참조하여 해당 다이얼로그를 렌더링하는 데 사용됩니다.
 * 새로운 다이얼로그를 추가하려면 여기에 '키(dialogName)'와 '값(React 컴포넌트)'을 추가해야 합니다.
 * @type {IDialogComponents}
 * @example
 * 예시: 'my-new-dialog' 다이얼로그 컴포넌트 추가
 * import MyNewDialog from './MyNewDialog';
 * export const DIALOG_COMPONENTS = {
 *   ...,
 *   'my-new-dialog': <MyNewDialog />,
 * }
 */
export const DIALOG_COMPONENTS: IDialogComponents = {
  'test-dialog': <TestDialog />,
  'test-inner-dialog': <TestInnerDialog />,
} as const;
