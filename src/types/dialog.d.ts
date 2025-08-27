interface DialogState {
  /** @type {string | number} 다이얼로그를 식별하는 고유한 이름 (식별 필요 시 사용) */
  dialogName: string | number;

  /** @type {React.ReactElement} 다이얼로그 내부에 렌더링될 React 컴포넌트로, DialogContent 컴포넌트를 사용하여 작성 */
  dialogContent: React.ReactElement;

  /** @type {boolean?} 배경 클릭으로 다이얼로그가 닫히는 것을 막을지 여부를 나타내는 플래그 */
  isBlockBackgroundClose?: boolean;
}

interface DialogStore {
  /** @type {DialogState[]} 스택으로 관리되는 다이얼로그 히스토리로, GlobalDialog에서 가장 마지막에 추가된 다이얼로그를 타겟으로 오픈시킴 */
  dialogs: DialogState[];

  /** @type {boolean} 현재 하나 이상의 다이얼로그가 화면에 열려 있는지 여부를 나타내는 전역 상태 */
  isOpen: boolean;

  /** @type {boolean} 다이얼로그가 닫히는 중인지 여부를 나타내는 전역 상태 */
  isClosing: boolean;

  /**
   * 다이얼로그가 닫히는 중인지 여부를 설정
   * @param {boolean} isClosing - 다이얼로그 닫힘 상태 (true: 닫히는 중, false: 닫힘 상태 아님).
   */
  setIsClosing: (isClosing: boolean) => void;

  /**
   * 새로운 다이얼로그를 스택에 추가하여 열기
   * @param {{ dialogName: string, dialogContent: React.ReactElement, isBlockBackgroundClose?: boolean }} dialogProps
   * @description
   * 첫 번째 다이얼로그를 열 때는 지연 없이 즉시 동작
   * 이미 다른 다이얼로그가 열려 있는 경우, 기존 다이얼로그의 닫힘 애니메이션을 위해 OPEN_DIALOG_DELAY만큼 지연된 후 새로운 다이얼로그가 열림
   */
  openDialog: ({ dialogName, dialogContent, isBlockBackgroundClose }: DialogState) => void;

  /**
   * 스택에서 가장 최근에 열린 다이얼로그를 닫기
   * @description
   * 다이얼로그가 닫히는 애니메이션을 위해 OPEN_DIALOG_DELAY만큼 지연된 후 스택에서 제거
   */
  closeDialog: () => void;

  /**
   * 스택에 있는 모든 다이얼로그를 닫기
   * @description
   * 모든 다이얼로그가 즉시 사라지는 애니메이션 후, OPEN_DIALOG_DELAY만큼 지연된 후 스택이 완전히 비워짐
   */
  closeAllDialog: () => void;
}

/**
 * 다이얼로그 컴포넌트들을 담는 인터페이스
 * key는 컴포넌트를 식별하는 고유한 문자열이며, value는 React 엘리먼트
 * @interface IDialogComponents
 */
interface IDialogComponents {
  [key: string]: React.ReactElement;
}
