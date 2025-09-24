import { getUserProductsAPI, ProductType } from '@/api/user/getUserProductsAPI';
import ProductCard from '@/app/components/ProductCard/ProductCard';
import { productKeys } from '@/constant/queryKeys';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';

interface Props {
  profileId: number;
  productType: ProductType;
}

const ProductList = ({ profileId, productType }: Props) => {
  const { data, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: productKeys.userProductList(profileId, productType),
    queryFn: ({ pageParam }) =>
      getUserProductsAPI({
        userId: profileId,
        type: productType,
        ...(pageParam && { cursor: pageParam }),
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const fetchObserverRef = useIntersectionObserver(fetchNextPage);

  const products = data?.pages.flatMap((page) => page.list) || [];

  const OPTION_MAP: Record<ProductType, string> = {
    reviewed: '리뷰를 남긴 상품',
    created: '등록한 상품',
    favorite: '찜한 상품',
  };

  return (
    <article className='mx-auto max-w-235'>
      <div className='grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-12 lg:grid-cols-3'>
        {products.map((product) => (
          <ProductCard key={product.id} productItem={product} />
        ))}
        <div ref={fetchObserverRef} className='text-center'>
          {isFetchingNextPage ? '로딩 중...' : ''}
        </div>
      </div>
      {products.length === 0 && (
        <div className='flex-center bg-gray-150 flex-col gap-5 rounded-4xl py-15'>
          <figure className='relative h-28 w-24'>
            <Image
              className='object-cover'
              src='/images/image_empty_review.png'
              alt='상품 없음 이미지'
              fill
              priority
              sizes='200px'
            />
          </figure>
          <p className='text-body1-medium text-gray-600'>{`${OPTION_MAP[productType]}이 없어요`}</p>
        </div>
      )}
    </article>
  );
};

const Skeleton = () => {
  return (
    <article className='mx-auto grid max-w-235 grid-cols-2 gap-x-3 gap-y-8 md:gap-x-5 md:gap-y-12 lg:grid-cols-3'>
      {new Array(3).fill(0).map((_, index) => (
        <ProductCard.skeleton key={index} />
      ))}
    </article>
  );
};

ProductList.skeleton = Skeleton;

export default ProductList;
