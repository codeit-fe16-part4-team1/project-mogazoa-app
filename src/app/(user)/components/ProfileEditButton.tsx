import clsx from 'clsx';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick?: () => void;
}

const ProfileEditButton = ({ className, onClick }: Props) => {
  return (
    <button
      className={clsx(
        'bg-gray-150 rounded-x1 text-gray-700 hover:bg-gray-300',
        'text-caption-medium md:text-body1-medium',
        className,
      )}
      onClick={onClick}
    >
      프로필 편집
    </button>
  );
};

export default ProfileEditButton;
