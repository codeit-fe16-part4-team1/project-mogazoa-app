import { getMyProfileAPI } from '@/api/user/getMyProfileAPI';
import ProductSection from '../components/ProductSection';
import { getMyProfileId } from '@/lib/getMyProfileId';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ProfileSection from '../components/ProfileSection';
import { profileKeys } from '@/constant/queryKeys';

const MyPage = async () => {
  const queryClient = new QueryClient();
  const myProfileId = Number(await getMyProfileId());
  console.log(`[DEBUG] My Profile Id: ${myProfileId}`);

  await queryClient.prefetchQuery({
    queryKey: profileKeys.detail(myProfileId),
    queryFn: () => getMyProfileAPI(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileSection profileId={myProfileId} isMyProfile={true} />
      <ProductSection profileId={myProfileId} />
    </HydrationBoundary>
  );
};

export default MyPage;
