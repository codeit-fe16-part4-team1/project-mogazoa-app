import CompareBar from '@/components/CompareBar/CompareBar';
import { ProductItem } from '@/types/api';

const Home = () => {
  const handleProductSelection = (selectedProduct: ProductItem) => {
    console.log('선택된 상품: ', selectedProduct.name);
  };

  return (
    <div>
      <h1>상품 비교 페이지</h1>
      <CompareBar onSelectProduct={handleProductSelection} />
    </div>
  );
};

export default Home;
