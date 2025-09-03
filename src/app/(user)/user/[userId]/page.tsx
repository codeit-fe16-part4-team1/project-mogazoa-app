import ProfileSection from '../../components/ProfileSection';
import ProductSection from '../../components/ProductSection';
import { getMyProfileId } from '@/lib/getMyProfileId';
import { redirect } from 'next/navigation';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getUserProfileAPI } from '@/api/user/getUserProfileAPI';

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

const UserPage = async ({ params }: PageProps) => {
  const queryClient = new QueryClient();

  const { userId } = await params;
  const myProfileId = await getMyProfileId();

  if (userId === myProfileId) redirect('/mypage');

  console.log(`[DEBUG] User Profile Id: ${userId}`);

  await queryClient.prefetchQuery({
    queryKey: ['profile', Number(userId)],
    queryFn: () => getUserProfileAPI({ userId: Number(userId) }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileSection profileId={Number(userId)} isMyProfile={false} />
      <ProductSection profileId={Number(userId)} />
    </HydrationBoundary>
  );
};

export default UserPage;
