import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ProfileSection from './components/ProfileSection';
import ProductSection from './components/ProductSection';
import { productKeys, profileKeys } from '@/constant/queryKeys';
import { getUserProfileAPI } from '@/api/user/getUserProfileAPI';
import { getUserProductsAPI, ProductType, TYPE_MAP } from '@/api/user/getUserProductsAPI';

interface Props {
  profileId: number;
  isMyProfile: boolean;
}

const ProfilePage = async ({ profileId, isMyProfile }: Props) => {
  const queryClient = new QueryClient();

  console.log(`[DEBUG] User Profile Id: ${profileId}`);

  await Promise.all([
    queryClient.fetchQuery({
      queryKey: profileKeys.detail(profileId),
      queryFn: () => getUserProfileAPI({ userId: profileId }),
    }),
    ...Object.keys(TYPE_MAP).map((ProductTypeKey) =>
      queryClient.fetchInfiniteQuery({
        queryKey: productKeys.userProductList(profileId, ProductTypeKey as ProductType),
        queryFn: ({ pageParam }) =>
          getUserProductsAPI({
            userId: profileId,
            type: ProductTypeKey as ProductType,
            cursor: pageParam || 0,
          }),
        initialPageParam: 0,
      }),
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileSection profileId={profileId} isMyProfile={isMyProfile} />
      <ProductSection profileId={profileId} />
    </HydrationBoundary>
  );
};

export default ProfilePage;
