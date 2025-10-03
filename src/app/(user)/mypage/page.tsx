import { redirect } from 'next/navigation';

import { getUserInfo } from '@/lib/getUserInfo';

import ProfilePage from '../ProfilePage';

const MyPage = async () => {
  const { userId: myUserId } = await getUserInfo();
  if (!myUserId) redirect('/signin');
  return <ProfilePage profileId={myUserId} isMyProfile={true} />;
};

export default MyPage;
