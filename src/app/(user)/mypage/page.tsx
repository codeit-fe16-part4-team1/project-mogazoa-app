import { getMyProfileAPI } from '@/api/user/getMyProfileAPI';
import ProductSection from '../components/ProductSection';
import { getMyProfileId } from '@/lib/getMyProfileId';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import ProfileSection from '../components/ProfileSection';

const MyPage = async () => {
  const queryClient = new QueryClient();
  const myProfileId = await getMyProfileId();
  console.log(`[DEBUG] My Profile Id: ${myProfileId}`);

  await queryClient.prefetchQuery({
    queryKey: ['profile', Number(myProfileId)],
    queryFn: () => getMyProfileAPI(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback='로딩중...'>
        <ProfileSection profileId={Number(myProfileId)} isMyProfile={true} />
      </Suspense>
      <ProductSection profileId={Number(myProfileId)} />
    </HydrationBoundary>
  );
};

export default MyPage;
