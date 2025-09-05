import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getProductsAPI } from '@/api/products/getProductsAPI';
import HomeClient from './HomeClient';
import { getCategories } from '@/api/category/getCategories';
import { getUsersRankingAPI } from '@/api/user/getUsersRankingAPI';

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
