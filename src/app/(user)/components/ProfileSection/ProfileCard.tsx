import clsx from 'clsx';
import ProfileImageViewer from './components/ProfileImageViewer';
import ProfileFollowInfo from './components/ProfileFollowInfo';
import ProfileEditButton from './components/ProfileEditButton';
import { Profile } from '@/types/api';

interface Props {
  profile: Profile;
  isMyProfile: boolean;
}

const ProfileCard = ({ profile, isMyProfile }: Props) => {
  return (
    <article className='mb-10 md:mb-12 lg:mb-10'>
      <div className='relative mx-auto flex flex-row gap-5 md:gap-15 md:px-7 lg:max-w-170 lg:gap-16'>
        <ProfileImageViewer imageUrl={profile.image} />
        <div className='flex flex-1 flex-col justify-center gap-2 md:gap-4'>
          <p id='nickname' className='text-lg font-bold text-gray-900 md:text-2xl'>
            {profile.nickname}
          </p>
          <p
            id='description'
            className={clsx('text-body1 hidden text-gray-900 md:inline-block', 'grow')}
          >
            {profile.description}
          </p>
          <ProfileFollowInfo profile={profile} />
        </div>
        {isMyProfile && (
          <ProfileEditButton
            className={clsx(
              'absolute',
              'px-3 py-2 md:px-5 md:py-3',
              'top-0 right-0 bottom-auto',
              'md:top-auto md:right-7 md:bottom-0',
            )}
            profile={profile}
          />
        )}
      </div>
      <p className={clsx('text-body1 inline-block w-full text-gray-900 md:hidden', 'mx-2 mt-6')}>
        {profile.description}
      </p>
    </article>
  );
};

export default ProfileCard;
