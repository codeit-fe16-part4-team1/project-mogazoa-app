import { getUserInfo } from '@/lib/getUserInfo';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { generateProfileMetadata } from '@/lib/metadata/profile';
import ProfilePage from '../../ProfilePage';

export interface ProfilePageProps {
  params: Promise<{
    userId: string;
  }>;
}

export const generateMetadata = async ({ params }: ProfilePageProps): Promise<Metadata> => {
  const { userId } = await params;
  return await generateProfileMetadata(Number(userId));
};

const UserPage = async ({ params }: ProfilePageProps) => {
  const { userId } = await params;
  const { userId: myUserId } = await getUserInfo();
  const profileId = Number(userId);
  if (profileId === myUserId) redirect('/mypage');
  return <ProfilePage profileId={profileId} isMyProfile={false} />;
};

export default UserPage;
