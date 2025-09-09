import Image from 'next/image';
import Badge from '../Badge/Badge';

interface CompareImageProps {
  imageUrl?: string;
  productName?: string;
  placeholder?: string;
  isComparing?: boolean;
  isWinner?: boolean;
  isTie?: boolean;
}

const CompareImage = ({
  imageUrl,
  productName,
  placeholder,
  isComparing,
  isWinner,
  isTie,
}: CompareImageProps) => {
  return (
    <div className='rounded-x4 md:rounded-x5 relative aspect-square w-25 overflow-hidden border border-gray-300 bg-gray-200 md:w-45'>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={productName || '상품이미지'}
          fill={true}
          className='object-cover'
        />
      ) : (
        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='font-cafe24-supermagic text-h2-bold text-gray-600 md:text-[50px]'>
            {placeholder}
          </span>
        </div>
      )}

      {isComparing && <Badge isWinner={isWinner || false} isTie={isTie || false} />}
    </div>
  );
};

export default CompareImage;
