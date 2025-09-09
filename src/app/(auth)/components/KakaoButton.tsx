import IconKakao from '@/assets/icons/icon_kakao.svg';

interface Props {
  onClick?: () => void;
}

const KakaoButton = ({ onClick }: Props) => {
  return (
    <button
      className='bg-kakao text-body1 mx-auto mb-5 flex cursor-pointer flex-row items-center justify-center gap-2 rounded-full p-4 hover:bg-amber-300'
      onClick={onClick}
    >
      <IconKakao className='w-6' />
    </button>
  );
};

export default KakaoButton;
