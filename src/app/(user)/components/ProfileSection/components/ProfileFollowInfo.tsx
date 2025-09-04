import { Profile } from '@/types/api';

interface Props {
  profile: Profile;
}

const ProfileFollowInfo = ({ profile }: Props) => {
  const ListMap = [
    { label: '팔로우', value: profile.followeesCount },
    { label: '팔로잉', value: profile.followersCount },
  ];

  return (
    <div className='flex flex-row items-center gap-4 md:h-11'>
      {ListMap.map(({ label, value }) => (
        <div key={label} className='flex flex-row items-center gap-1'>
          <label className='text-body1 text-gray-600'>{label}</label>
          <p className='text-sub-headline-bold text-gray-900'>{value}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileFollowInfo;
