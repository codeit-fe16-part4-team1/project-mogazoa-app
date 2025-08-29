import IconKakao from '@/assets/icons/icon_kakao.svg';

interface Props {
  onClick?: () => void;
  children: React.ReactNode;
}

const KakaoButton = ({ onClick, children }: Props) => {
  return (
    <button
      className='bg-kakao text-body1 mx-auto flex aspect-square h-12 w-44 cursor-pointer flex-row items-center justify-center gap-2 rounded-xl hover:bg-amber-300'
      onClick={onClick}
    >
      <IconKakao className='w-6' />
      {children}
    </button>
  );
};

export default KakaoButton;
