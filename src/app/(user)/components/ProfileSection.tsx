'use client';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getUserProfileAPI } from '@/api/user/getUserProfileAPI';
import { profileKeys } from '@/constant/queryKeys';

import ProfileButtonArea from './ProfileSection/ProfileButtonArea';
import ProfileCard from './ProfileSection/ProfileCard';
import ProfileStats from './ProfileSection/ProfileStats';

interface Props {
  profileId: number;
  isMyProfile: boolean;
}

const ProfileSection = ({ profileId, isMyProfile }: Props) => {
  const { data: profile } = useSuspenseQuery({
    queryKey: profileKeys.detail(profileId),
    queryFn: () => getUserProfileAPI({ userId: profileId }),
  });

  if (!profile) return;

  return (
    <section className='rounded-b-4xl bg-white px-5 py-7 shadow-md md:px-15 md:py-15 lg:py-10'>
      <ProfileCard profile={profile} isMyProfile={isMyProfile} />
      <ProfileStats profile={profile} />
      <ProfileButtonArea profile={profile} isMyProfile={isMyProfile} />
    </section>
  );
};

export default ProfileSection;
