import { getMyProfileAPI } from '@/api/user/getMyProfileAPI';
import ProductSection from '../components/ProductSection';
import { getUserInfo } from '@/lib/getUserInfo';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ProfileSection from '../components/ProfileSection';
import { productKeys, profileKeys } from '@/constant/queryKeys';
import { getUserProductsAPI } from '@/api/user/getUserProductsAPI';

const MyPage = async () => {
  const queryClient = new QueryClient();
  const { userId } = await getUserInfo();
  console.log(`[DEBUG] My Profile Id: ${userId}`);

  await Promise.all([
    queryClient.fetchQuery({
      queryKey: profileKeys.detail(userId),
      queryFn: () => getMyProfileAPI(),
    }),
    queryClient.fetchInfiniteQuery({
      queryKey: productKeys.userProductList(userId, 'reviewed'),
      queryFn: ({ pageParam }) =>
        getUserProductsAPI({
          userId: userId,
          type: 'reviewed',
          cursor: pageParam || 0,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      pages: 0,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileSection profileId={userId} isMyProfile={true} />
      <ProductSection profileId={userId} />
    </HydrationBoundary>
  );
};

export default MyPage;
