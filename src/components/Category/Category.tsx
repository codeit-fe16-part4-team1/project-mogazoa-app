import clsx from 'clsx';
import OptionList from '@/components/OptionList/OptionList';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCategoryMap } from '@/hooks/useCategoryMap';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import CategoryButton from '@/components/Category/CategoryButton';
import PaginationButton from '../PaginationButton/PaginationButton';
import ScrollContainer from 'react-indiana-drag-scroll';

const BUTTON_CLASSES = {
  tab: 'min-w-20 flex-1 cursor-pointer',
  button: 'min-w-22 min-h-22 md:w-22 aspect-square cursor-pointer',
} as const;

const CategoryItemSet = ({ name, type }: { name: string; type: 'button' | 'tab' }) => {
  const { getCategoryIcon } = useCategoryMap();
  const Icon = getCategoryIcon(name);

  const iconClasses = clsx('h-6 w-6 md:h-7 md:w-7', type === 'button' ? 'text-gray-700' : '');

  const textClasses = clsx(
    'md:text-caption text-[11px] tracking-[0.4px]',
    type === 'button' ? 'text-gray-800' : '',
  );

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-between justify-center gap-1.5',
        type === 'tab' ? 'py-5' : '',
      )}
    >
      <Icon className={iconClasses} />
      <span className={textClasses}>{name}</span>
    </div>
  );
};

interface CategoryProps {
  type: 'button' | 'tab';
}

const Category = ({ type }: CategoryProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');
  const { categoryData } = useCategoryMap();
  const { scrollContainerRef, canScrollPrev, canScrollNext, scrollToDirection } =
    useHorizontalScroll();

  const handleCategoryClick = (categoryId: number) => {
    const params = new URLSearchParams(searchParams);
    const currentCategoryId = currentCategory ? Number(currentCategory) : undefined;

    if (currentCategoryId === categoryId) {
      params.delete('category');
    } else {
      params.set('category', categoryId.toString());
    }

    router.push(`/?${params.toString()}`);
  };

  const renderCategoryItems = () => {
    if (!categoryData) return null;

    if (type === 'tab') {
      return (
        <OptionList
          className='flex w-full justify-between'
          selectedValue={currentCategory || undefined}
        >
          {categoryData.map((item) => (
            <OptionList.button
              key={item.id}
              role='tab'
              className={BUTTON_CLASSES.tab}
              value={item.id.toString()}
              onClick={() => handleCategoryClick(item.id)}
            >
              <CategoryItemSet name={item.name} type={type} />
            </OptionList.button>
          ))}
        </OptionList>
      );
    }

    return (
      <div className='flex w-full justify-between gap-1.5'>
        {categoryData.map((item) => (
          <CategoryButton
            className={BUTTON_CLASSES.button}
            key={item.id}
            onClick={() => handleCategoryClick(item.id)}
          >
            <CategoryItemSet name={item.name} type={type} />
          </CategoryButton>
        ))}
      </div>
    );
  };

  const renderPaginationButtons = () => {
    if (canScrollNext) {
      return (
        <PaginationButton
          direction='next'
          size='sm'
          disabled={false}
          onClick={() => scrollToDirection('next')}
          className='shrink-0'
        />
      );
    }

    if (canScrollPrev) {
      return (
        <PaginationButton
          direction='prev'
          size='sm'
          disabled={false}
          onClick={() => scrollToDirection('prev')}
          className='shrink-0'
        />
      );
    }

    return null;
  };

  return (
    <div className='flex items-center gap-1'>
      <ScrollContainer
        innerRef={scrollContainerRef}
        className='w-full cursor-grab overflow-x-auto active:cursor-grabbing [&::-webkit-scrollbar]:hidden'
      >
        {renderCategoryItems()}
      </ScrollContainer>
      {renderPaginationButtons()}
    </div>
  );
};

export default Category;
