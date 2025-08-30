import { Profile } from '@/types/api';

export const mockProfile: Profile = {
  updatedAt: '2025-08-30T10:15:00Z',
  createdAt: '2024-12-01T09:00:00Z',
  teamId: '16-1-1',
  image:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/832/1756526130023/image.png',
  description: '프론트엔드 개발을 좋아하는 열정적인 개발자입니다.',
  nickname: '치영',
  id: 832,
  mostFavoriteCategory: {
    name: '가구/인테리어',
    id: 101,
  },
  averageRating: 4.8,
  reviewCount: 25,
  followeesCount: 120,
  followersCount: 98,
  isFollowing: false,
};
