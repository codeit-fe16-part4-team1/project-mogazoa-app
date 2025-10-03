import { Metadata } from 'next';
import { headers } from 'next/headers';

import CompareContent from './CompareContent';

export const generateMetadata = async (): Promise<Metadata> => {
  const headersList = headers();
  const host = (await headersList).get('host') || process.env.DOMAIN;
  const currentUrl = `https://${host}/compare`;

  return {
    title: `상품비교 | mogazoa`,
    description: 'mogazoa에서 다양한 상품을 비교해보세요',
    openGraph: {
      title: '상품비교 | mogazoa',
      description: 'mogazoa에서 다양한 상품을 비교해보세요',
      images: `https://${host}/images/image_opengraph_wide_mogazoa.png`,
      url: currentUrl,
      type: 'website',
      siteName: 'mogazoa',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

const ComparePage = async () => {
  return (
    <div className='fullscreen flex flex-col items-center bg-gray-100'>
      <div className='mt-10 mb-10 flex w-85 flex-col items-center gap-10 md:mt-20 md:mb-10 md:w-170 md:gap-16 lg:w-225'>
        <CompareContent />
      </div>
    </div>
  );
};

export default ComparePage;
