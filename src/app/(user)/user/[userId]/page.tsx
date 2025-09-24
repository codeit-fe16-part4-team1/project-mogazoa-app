import ProfileSection from '../../components/ProfileSection';
import ProductSection from '../../components/ProductSection';
import { getUserInfo } from '@/lib/getUserInfo';
import { redirect } from 'next/navigation';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getUserProfileAPI } from '@/api/user/getUserProfileAPI';
import { profileKeys } from '@/constant/queryKeys';
import { Metadata } from 'next';
import { generateProfileMetadata } from '@/lib/metadata/profile';

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
  const queryClient = new QueryClient();

  const { userId } = await params;
  const profileId = Number(userId);

  const { userId: myProfileId } = await getUserInfo();

  if (profileId === myProfileId) redirect('/mypage');

  console.log(`[DEBUG] User Profile Id: ${profileId}`);

  await queryClient.fetchQuery({
    queryKey: profileKeys.detail(profileId),
    queryFn: () => getUserProfileAPI({ userId: profileId }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileSection profileId={profileId} isMyProfile={false} />
      <ProductSection profileId={profileId} />
    </HydrationBoundary>
  );
};

export default UserPage;
