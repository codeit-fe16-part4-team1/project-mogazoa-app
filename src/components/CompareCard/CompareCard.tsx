import { ProductItem } from '@/types/api';
import CompareImage from '../CompareImage/CompareImage';
import CompareBar from '../CompareBar/CompareBar';
import CompareDetail from '../CompareDetail/CompareDetail';
import CompareDetailDefault from '../CompareDetail/CompareDetailDefault';
import Badge from '../Badge/Badge';

interface CompareCardProps {
  products: ProductItem[];
  selectedProduct: ProductItem | null;
  label: string;
  onSelectProduct: (product: ProductItem) => void;
  onRemoveProduct: () => void;
  isComparing: boolean;
  isRatingWinner?: boolean;
  isReviewCountWinner?: boolean;
  isFavoriteCountWinner?: boolean;
  isWinner?: boolean;
  isTie?: boolean;
}

const CompareCard = ({
  products,
  selectedProduct,
  label,
  onSelectProduct,
  onRemoveProduct,
  isComparing,
  isRatingWinner,
  isReviewCountWinner,
  isFavoriteCountWinner,
  isWinner,
  isTie,
}: CompareCardProps) => {
  return (
    <div className='flex w-[290px] flex-col items-center justify-center gap-[34px] lg:w-[405px]'>
      <div className='relative flex flex-col items-center justify-center'>
        {/* 뱃지 조건부 렌더링 */}
        {isComparing && <Badge isWinner={isWinner || false} isTie={isTie || false} />}

        <CompareImage
          productName={selectedProduct?.name || label}
          imageUrl={selectedProduct?.image || ''}
          placeholder={label}
        />
      </div>

      <div className='w-full'>
        <CompareBar
          products={products}
          selectedProduct={selectedProduct}
          onSelectProduct={onSelectProduct}
          onRemoveProduct={onRemoveProduct}
        />
      </div>

      <div className='w-full'>
        {selectedProduct ? (
          <CompareDetail
            rating={selectedProduct?.rating || 0}
            reviewCount={selectedProduct?.reviewCount || 0}
            favoriteCount={selectedProduct?.favoriteCount || 0}
            isRatingWinner={isRatingWinner}
            isReviewCountWinner={isReviewCountWinner}
            isFavoriteCountWinner={isFavoriteCountWinner}
          />
        ) : (
          <CompareDetailDefault placeholder={label} />
        )}
      </div>
    </div>
  );
};

export default CompareCard;
