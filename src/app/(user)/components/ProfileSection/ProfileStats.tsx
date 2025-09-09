import { CategorieChip } from '@/components/Chip/CategorieChip';
import { Profile } from '@/types/api';

interface Props {
  profile: Profile;
}

const ProfileStats = ({ profile }: Props) => {
  const ListMap = [
    {
      label: '남긴 별점 평균',
      value: (
        <p className='text-sub-headline-bold px-2 py-1 md:text-2xl'>
          {profile.averageRating.toFixed(1)}
        </p>
      ),
    },
    {
      label: '남긴 리뷰',
      value: <p className='text-sub-headline-bold px-2 py-1 md:text-2xl'>{profile.reviewCount}</p>,
    },
    {
      label: '관심 카테고리',
      value: profile?.mostFavoriteCategory ? (
        <CategorieChip
          key={profile.mostFavoriteCategory?.name}
          categoryId={profile.mostFavoriteCategory.id}
          variant='default'
        >
          {profile.mostFavoriteCategory?.name}
        </CategorieChip>
      ) : (
        <p className='text-sub-headline-bold px-2 py-1 md:text-2xl'>-</p>
      ),
    },
  ];

  return (
    <article className='mx-4 mb-10 flex flex-row justify-between border-t-1 border-gray-200 pt-7 md:mx-2 md:mb-12 md:justify-around lg:mx-auto lg:mb-9 lg:max-w-170'>
      {ListMap.map(({ label, value }) => (
        <div key={label} className='flex flex-col items-center justify-between gap-2'>
          {value}
          <p className='text-body2 md:text-body1 text-gray-600'>{label}</p>
        </div>
      ))}
    </article>
  );
};

export default ProfileStats;
