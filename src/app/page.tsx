import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getProductsAPI } from '@/api/products/getProductsAPI';
import HomeClient from './HomeClient';

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
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClient />
    </HydrationBoundary>
  );
};

export default Home;
