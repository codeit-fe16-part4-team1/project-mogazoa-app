import CategoryChip from '@/components/Chip/CategoryChip';
import { Profile } from '@/types/api';

interface Props {
  profile: Profile;
}

const ProfileStats = ({ profile }: Props) => {
  const ListMap = [
    {
      label: '남긴 별점 평균',
      value: (
        <span className='text-sub-headline-bold md:text-2xl'>
          {profile.averageRating.toFixed(1)}
        </span>
      ),
    },
    {
      label: '남긴 리뷰',
      value: <span className='text-sub-headline-bold md:text-2xl'>{profile.reviewCount}</span>,
    },
    {
      label: '관심 카테고리',
      value: profile?.mostFavoriteCategory ? (
        <CategoryChip
          categoryId={profile?.mostFavoriteCategory.id}
          className='flex flex-row items-center gap-1'
        >
          <CategoryChip.text className='text-body1-bold md:text-h4-bold text-gray-900' />
          <CategoryChip.icon className='size-5 text-gray-800 md:size-7' />
        </CategoryChip>
      ) : (
        <p className='text-sub-headline-bold px-2 py-1 md:text-2xl'>-</p>
      ),
    },
  ];

  return (
    <article className='mx-4 mb-10 flex flex-row justify-between border-t-1 border-gray-200 pt-7 md:mx-2 md:mb-12 md:justify-around lg:mx-auto lg:mb-9 lg:max-w-170'>
      {ListMap.map(({ label, value }) => (
        <div key={label} className='flex flex-col items-center justify-between gap-2'>
          <div className='flex items-center'>{value}</div>
          <p className='text-body2 md:text-body1 text-gray-600'>{label}</p>
        </div>
      ))}
    </article>
  );
};

export default ProfileStats;
