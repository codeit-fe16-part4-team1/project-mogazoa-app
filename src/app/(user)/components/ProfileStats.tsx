import { Profile } from '@/types/api';

interface Props {
  profile: Profile;
}

const ProfileStats = ({ profile }: Props) => {
  const ListMap = [
    { label: '남긴 별점 리뷰', value: profile.averageRating },
    { label: '남긴 리뷰', value: profile.reviewCount },
    { label: '관심 카테고리', value: profile.mostFavoriteCategory?.name },
  ];

  return (
    <article className='mx-4 mb-10 flex flex-row justify-between border-t-1 border-gray-200 pt-7 md:mx-2 md:mb-12 md:justify-around lg:mx-auto lg:mb-9 lg:max-w-170'>
      {ListMap.map(({ label, value }) => (
        <div key={label} className='flex flex-col items-center gap-2'>
          <p className='text-sub-headline-bold text-black md:text-xl'>{value}</p>
          <p className='text-body2 md:text-body1 text-gray-600'>{label}</p>
        </div>
      ))}
    </article>
  );
};

export default ProfileStats;
