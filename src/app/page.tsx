import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getProductsAPI } from '@/api/products/getProductsAPI';
import HomeClient from './HomeClient';
import { getCategories } from '@/api/category/getCategories';
import { getUsersRankingAPI } from '@/api/user/getUsersRankingAPI';
import { headers } from 'next/headers';
import { Metadata } from 'next';

interface Props {
  searchParams: Promise<{
    query?: string;
    category?: string;
  }>;
}

export const generateMetadata = async ({ searchParams }: Props): Promise<Metadata> => {
  const headersList = headers();
  const host = (await headersList).get('host') || process.env.DOMAIN;

  const { query, category } = await searchParams;

  const queryString = new URLSearchParams();

  if (query) queryString.set('query', query);

  let categoryName = '';
  if (category) {
    const categories = await getCategories();
    const nextCategory = categories.find((cat) => cat.id === Number(category));
    if (!!nextCategory) categoryName = nextCategory.name;
    queryString.set('category', category);
  }

  const queryStr = queryString.toString();
  const currentUrl = `https://${host}/${queryStr ? `?${queryStr}` : ''}`;

  let title = '';
  let description = 'mogazoa에서 다양한 상품을 비교해보세요';

  if (query && categoryName) {
    title = `"${query}" ${categoryName} 상품 검색 | mogazoa`;
    description = `mogazoa에서 "${query}" 관련 ${categoryName} 상품들을 비교해보세요`;
  } else if (query) {
    title = `"${query}" 상품 검색 | mogazoa`;
    description = `mogazoa에서 "${query}" 관련 상품들을 비교해보세요`;
  } else if (categoryName) {
    title = `${categoryName} 상품 검색 | mogazoa`;
    description = `mogazoa에서 ${categoryName} 카테고리 상품들을 비교해보세요`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: `https://${host}/images/image_opengraph_wide_mogazoa.png`,
      url: currentUrl,
      type: 'website',
      siteName: 'mogazoa',
    },
    robots: {
      index: false,
      follow: true,
    },
  };
};

const Home = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['products', 'reviewCount'],
      queryFn: () => getProductsAPI({ order: 'reviewCount' }),
    }),
    queryClient.prefetchQuery({
      queryKey: ['products', 'rating'],
      queryFn: () => getProductsAPI({ order: 'rating' }),
    }),
    queryClient.prefetchQuery({
      queryKey: ['categories'],
      queryFn: () => getCategories(),
    }),
    queryClient.prefetchQuery({
      queryKey: ['usersRanking'],
      queryFn: () => getUsersRankingAPI(),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClient />
    </HydrationBoundary>
  );
};

export default Home;
