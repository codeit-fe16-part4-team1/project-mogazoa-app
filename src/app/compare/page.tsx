import { getProductsAPI } from '@/api/products/getProductsAPI';
import { ProductItem } from '@/types/api';
import CompareContent from './CompareContent';
import { Metadata } from 'next';
import { headers } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const host = (await headersList).get('host') || process.env.DOMAIN;
  const currentUrl = `https://${host}/compare`;

  return {
    title: `상품비교 | mogazoa`,
    description: 'mogazoa에서 다양한 상품을 비교해보세요',
    openGraph: {
      title: '상품비교 | mogazoa',
      description: 'mogazoa에서 다양한 상품을 비교해보세요',
      url: currentUrl,
      type: 'website',
      siteName: 'mogazoa',
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}
const fetchAllProducts = async () => {
  let allItems: ProductItem[] = [];
  let cursor: number | null = null;
  let hasMore = true;
  while (hasMore) {
    const { list, nextCursor } = await getProductsAPI({
      order: 'recent',
      cursor: cursor === null ? undefined : cursor,
    });
    allItems = [...allItems, ...list];
    if (nextCursor === null) {
      hasMore = false;
    }
    cursor = nextCursor;
  }
  return allItems;
};

const ComparePage = async () => {
  const allProducts = await fetchAllProducts();

  return (
    <div className='fullscreen flex flex-col items-center bg-gray-100'>
      <div className='mt-10 mb-10 flex w-85 flex-col items-center gap-10 md:mt-20 md:mb-10 md:w-170 md:gap-16 lg:w-225'>
        <CompareContent allProducts={allProducts} />
      </div>
    </div>
  );
};

export default ComparePage;
