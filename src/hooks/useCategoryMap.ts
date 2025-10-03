'use client';
import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/api/category/getCategories';
import IconApp from '@/assets/icons/icon_category_app.svg';
import IconBeauty from '@/assets/icons/icon_category_beauty.svg';
import IconBook from '@/assets/icons/icon_category_book.svg';
import IconElectronic from '@/assets/icons/icon_category_electronic.svg';
import IconFashion from '@/assets/icons/icon_category_fashion.svg';
import IconHotel from '@/assets/icons/icon_category_hotel.svg';
import IconInterior from '@/assets/icons/icon_category_interior.svg';
import IconMovie from '@/assets/icons/icon_category_movie.svg';
import IconMusic from '@/assets/icons/icon_category_music.svg';
import IconRestaurant from '@/assets/icons/icon_category_restaurant.svg';
import { Category } from '@/types/api';

const categoryIconMap = {
  음악: IconMusic,
  '영화/드라마': IconMovie,
  '강의/책': IconBook,
  호텔: IconHotel,
  '가구/인테리어': IconInterior,
  식당: IconRestaurant,
  전자기기: IconElectronic,
  화장품: IconBeauty,
  '의류/잡화': IconFashion,
  앱: IconApp,
} as const;

export const useCategoryMap = () => {
  const {
    data: categoryData,
    isLoading,
    error,
  } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  const getCategoryIcon = (name: string) => {
    return categoryIconMap[name as keyof typeof categoryIconMap] || IconApp;
  };

  const getCategoryName = (id: number) => {
    return categoryData?.find((cat) => cat.id === id)?.name;
  };

  return {
    categoryData,
    isLoading,
    error,
    getCategoryIcon,
    getCategoryName,
  };
};
