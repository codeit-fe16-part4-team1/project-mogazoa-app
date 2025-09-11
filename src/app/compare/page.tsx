import { getProductsAPI } from '@/api/products/getProductsAPI';
import { ProductItem } from '@/types/api';
import CompareContent from './CompareContent';

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
    <div className='full-screen flex flex-col items-center bg-gray-100'>
      <div className='mt-10 flex w-85 flex-col items-center gap-10 md:mt-20 md:w-170 md:gap-16 lg:w-225'>
        <CompareContent allProducts={allProducts} />
      </div>
    </div>
  );
};

export default ComparePage;
