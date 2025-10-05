import { useSuspenseQuery } from '@tanstack/react-query';

import { getProductsAPI } from '@/api/products/getProductsAPI';

import ProductCard from '../../components/ProductCard/ProductCard';
import GridLayout from './GridLayout';

const BestProductSection = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['products', 'reviewCount'],
    queryFn: () => getProductsAPI({ order: 'reviewCount' }),
  });
  const productList = data.list.slice(0, 6);
  return (
    <section>
      <h2 className='text-h4-bold font-cafe24-supermagic mb-5 text-gray-900'>
        지금 핫한 상품 Best
      </h2>
      <GridLayout>
        {productList.map((product) => (
          <ProductCard key={product.id} productItem={product} />
        ))}
      </GridLayout>
    </section>
  );
};

export default BestProductSection;
