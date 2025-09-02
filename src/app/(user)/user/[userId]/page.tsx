import { getUserProfileAPI } from '@/api/user/getUserProfileAPI';
import ProfileSection from '../../components/ProfileSection';
import ProductSection from '../../components/ProductSection';
import { getMyProfileId } from '@/lib/getMyProfileId';
import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

const UserPage = async ({ params }: PageProps) => {
  const { userId } = await params;
  const myProfileId = await getMyProfileId();
  if (userId === myProfileId) {
    redirect('/mypage');
  }
  const profile = await getUserProfileAPI({ userId: Number(userId) });
  console.log(`[DEBUG] User Profile Id: ${userId}`);
  return (
    <div>
      <ProfileSection profile={profile} isMyProfile={false} />
      <ProductSection id={profile.id} />
    </div>
  );
};

export default UserPage;
