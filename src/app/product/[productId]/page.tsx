import { getProductDetail } from '@/api/product/getProductDetail';
import { getReviewList } from '@/api/product/getReviewList';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { productKeys, reviewKeys } from '@/constant/queryKeys';
import ProductDetailPage from './ProductDetailPage';
import { getUserInfo } from '@/lib/getUserInfo';
import { Metadata } from 'next';
import { headers } from 'next/headers';

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> {
  const productId = Number(params.productId);

  const headersList = headers();
  const host = (await headersList).get('host') || 'new-project-final.link';
  const currentUrl = `https://${host}/product/${productId}`;

  try {
    const productDetail = await getProductDetail(productId);

    return {
      title: `${productDetail.name} - 상품 상세`,
      description: productDetail.description,
      keywords: [
        'mogazoa',
        '모가조아',
        productDetail.name,
        '상품평가',
        '상품통계',
        '상품비교',
        '상품리뷰',
      ],
      openGraph: {
        title: `${productDetail.name} - 상품 상세 | mogazoa`,
        description: productDetail.description,
        siteName: 'mogazoa',
        locale: 'ko_KR',
        type: 'article',
        publishedTime: productDetail.createdAt,
        modifiedTime: productDetail.updatedAt,
        section: productDetail.category.name,
        url: currentUrl,
        images: [
          {
            url: productDetail.image,
            width: 200,
            height: 200,
            alt: `${productDetail.name} 상품 이미지`,
          },
        ],
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
    console.error('Failed to fetch product detail for metadata:', error);
    return {
      title: '상품 상세 페이지',
      description: '상품 정보를 확인하세요.\n\nmogazoa에서 다양한 상품 리뷰와 정보를 확인하세요',
      openGraph: {
        title: `상품 상세`,
        description: '상품 정보를 확인하세요.\n\nmogazoa에서 다양한 상품 리뷰와 정보를 확인하세요',
        siteName: 'mogazoa',
        locale: 'ko_KR',
        type: 'article',
        url: currentUrl,
      },
    };
  }
}

const ProductDetailPageServer = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId: slug } = await params;
  const productId = Number(slug);
  const order = 'recent';
  const { userId } = await getUserInfo();
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: productKeys.detail(productId),
      queryFn: () => getProductDetail(productId),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: reviewKeys.list(productId, order),
      queryFn: ({ pageParam }) => getReviewList({ productId, cursor: pageParam }),
      initialPageParam: 0,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailPage productId={productId} order={order} userId={userId} />
    </HydrationBoundary>
  );
};

export default ProductDetailPageServer;
