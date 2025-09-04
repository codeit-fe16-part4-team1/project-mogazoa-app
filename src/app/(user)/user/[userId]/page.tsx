import ProfileSection from '../../components/ProfileSection';
import ProductSection from '../../components/ProductSection';
import { getMyProfileId } from '@/lib/getMyProfileId';
import { redirect } from 'next/navigation';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getUserProfileAPI } from '@/api/user/getUserProfileAPI';
import { profileKeys } from '@/constant/queryKeys';
import { headers } from 'next/headers';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { userId } = await params;
  const profileId = Number(userId);

  // headers에서 현재 URL 가져오기
  const headersList = headers();
  const host = (await headersList).get('host') || 'new-project-final.link';
  const currentUrl = `https://${host}/user/${userId}`;

  try {
    const userProfile = await getUserProfileAPI({ userId: profileId });

    const { nickname, followersCount, reviewCount } = userProfile;

    const metaTitle = `${nickname}님의 프로필`;
    const metaDescription = `${nickname}님의 프로필 • 팔로워 ${followersCount}명 • 리뷰 ${reviewCount}개 | mogazoa에서 다양한 상품 리뷰와 정보를 확인하세요.`;

    return {
      title: metaTitle,
      description: metaDescription,

      keywords: [nickname, '프로필', '리뷰', '상품평가', 'mogazoa'],

      openGraph: {
        title: metaTitle,
        description: metaDescription,
        url: currentUrl,
        type: 'profile',
        images: userProfile.image
          ? [
              {
                url: userProfile.image,
                width: 400,
                height: 400,
                alt: `${nickname}님의 프로필 사진`,
              },
            ]
          : [],
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: currentUrl,
      },
    };
  } catch (error) {
    console.error('Failed to fetch user profile for metadata:', error);

    return {
      title: `사용자 프로필`,
      description: '사용자의 프로필과 리뷰를 확인해보세요.',
      openGraph: {
        title: '사용자 프로필 | mogazoa',
        description: '사용자의 프로필과 리뷰를 확인해보세요.',
        url: currentUrl,
        type: 'profile',
      },
    };
  }
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
