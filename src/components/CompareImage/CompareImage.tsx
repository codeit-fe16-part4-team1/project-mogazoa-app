import Image from 'next/image';

interface CompareImageProps {
  imageUrl?: string;
  productName?: string;
  placeholder?: string;
}

const CompareImage = ({ imageUrl, productName, placeholder }: CompareImageProps) => {
  return (
    <div className='rounded-x3 md:rounded-x4 relative aspect-square h-45 w-25 overflow-hidden border border-gray-300 bg-gray-200 md:h-45 md:w-45'>
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
    </div>
  );
};

export default CompareImage;
