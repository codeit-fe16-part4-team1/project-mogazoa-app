import { Follows } from '@/api/user/getUserFollowsAPI';
import useDialog from '@/hooks/useDialog';
import { Profile } from '@/types/api';

interface Props {
  profile: Profile;
}

const ProfileFollowInfo = ({ profile }: Props) => {
  const { open } = useDialog();

  const followsCountMap = {
    followers: profile.followersCount,
    followees: profile.followeesCount,
  };

  const handleFollowInfoClick = (type: Follows) => {
    if (!profile) return;
    open({
      dialogName: 'profile-follow-dialog',
      dialogProps: {
        profileId: profile.id,
        followsCount: followsCountMap[type],
        type,
      },
    });
  };

  interface ListMapType {
    label: string;
    value: number;
    type: Follows;
  }

  const ListMap: ListMapType[] = [
    { label: '팔로우', value: profile.followersCount, type: 'followers' },
    { label: '팔로잉', value: profile.followeesCount, type: 'followees' },
  ];

  return (
    <div className='flex flex-row items-center gap-4 md:h-11'>
      {ListMap.map(({ label, value, type }) => (
        <div
          key={label}
          className='group hover-animate flex cursor-pointer flex-row items-center gap-1'
          onClick={() => handleFollowInfoClick(type)}
        >
          <label className='text-body1 cursor-pointer text-gray-600'>{label}</label>
          <p className='text-sub-headline-bold group-hover:text-primary-orange-700 hover-animate cursor-pointer text-gray-900'>
            {value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProfileFollowInfo;
