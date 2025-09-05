import { getMyProfileAPI } from '@/api/user/getMyProfileAPI';
import ProductSection from '../components/ProductSection';
import { getUserInfo } from '@/lib/getUserInfo';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ProfileSection from '../components/ProfileSection';
import { profileKeys } from '@/constant/queryKeys';

const MyPage = async () => {
  const queryClient = new QueryClient();
  const { userId } = await getUserInfo();
  console.log(`[DEBUG] My Profile Id: ${userId}`);

  await queryClient.prefetchQuery({
    queryKey: profileKeys.detail(userId),
    queryFn: () => getMyProfileAPI(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileSection profileId={userId} isMyProfile={true} />
      <ProductSection profileId={userId} />
    </HydrationBoundary>
  );
};

export default MyPage;
