import { getMyProfileAPI } from '@/api/user/getMyProfileAPI';
import ProductSection from '../components/ProductSection';
import { getMyProfileId } from '@/lib/getMyProfileId';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
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
      <Suspense fallback='로딩중...'>
        <ProfileSection profileId={myProfileId} isMyProfile={true} />
      </Suspense>
      <ProductSection profileId={myProfileId} />
    </HydrationBoundary>
  );
};

export default MyPage;
