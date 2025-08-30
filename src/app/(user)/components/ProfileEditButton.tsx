import clsx from 'clsx';

interface Props {
  onClick?: () => void;
}

const ProfileEditButton = ({ onClick }: Props) => {
  return (
    <button
      className={clsx(
        'bg-gray-150 rounded-x1 text-gray-700 hover:bg-gray-300',
        'text-caption-medium md:text-body1-medium absolute',
        'px-3 py-2 md:px-5 md:py-3',
        'top-0 right-0 bottom-auto',
        'md:top-auto md:right-7 md:bottom-0',
      )}
      onClick={onClick}
    >
      프로필 편집
    </button>
  );
};

export default ProfileEditButton;
