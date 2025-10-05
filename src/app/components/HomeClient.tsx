'use client';
import { useSearchParams } from 'next/navigation';

import Banner from './Banner';
import BestProductSection from './BestProductSection';
import CategorySection from './CategorySection';
import HighRatingProductSection from './HighRatingProductSection';
import ReviewerSection from './ReviewerSection';
import SearchedSection from './SearchedSection';

const HomeClient = () => {
  const params = useSearchParams();
  const categoryId = Number(params.get('category'));
  const query = params.get('query') || '';

  const isSearching = !!categoryId || !!query;
  return (
    <main>
      <Banner />
      <div className='mx-4 max-w-243 pt-10 pb-13 md:mx-15 lg:mx-auto'>
        <CategorySection />
      </div>
      <div className='mx-4 max-w-236 pb-22 md:mx-15 lg:mx-auto'>
        {!isSearching && (
          <>
            <ReviewerSection />
            <BestProductSection />
            <div className='my-10 border-b-1 border-gray-200 md:my-12 lg:my-16' />
            <HighRatingProductSection />
          </>
        )}
        {isSearching && <SearchedSection categoryId={categoryId} searchKeyword={query} />}
      </div>
    </main>
  );
};

export default HomeClient;
