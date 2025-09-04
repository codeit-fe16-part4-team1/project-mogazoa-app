import ProfileSection from '../../components/ProfileSection';
import ProductSection from '../../components/ProductSection';
import { getMyProfileId } from '@/lib/getMyProfileId';
import { redirect } from 'next/navigation';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getUserProfileAPI } from '@/api/user/getUserProfileAPI';
import { profileKeys } from '@/constant/queryKeys';

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

const UserPage = async ({ params }: PageProps) => {
  const queryClient = new QueryClient();

  const { userId } = await params;
  const profileId = Number(userId);
  const myProfileId = Number(await getMyProfileId());

  if (profileId === myProfileId) redirect('/mypage');

  console.log(`[DEBUG] User Profile Id: ${profileId}`);

  await queryClient.prefetchQuery({
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
