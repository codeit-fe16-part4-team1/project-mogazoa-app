import { ProductsList } from '@/types/api';

export const mockProductsList: ProductsList = {
  nextCursor: 6,
  list: [
    {
      updatedAt: '2025-08-30T10:15:00Z',
      createdAt: '2025-08-20T09:00:00Z',
      writerId: 1,
      categoryId: 101,
      favoriteCount: 12,
      reviewCount: 3,
      rating: 4.5,
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/832/1756526130023/image.png',
      name: '무선 블루투스 이어폰',
      id: 1,
    },
    {
      updatedAt: '2025-08-29T14:30:00Z',
      createdAt: '2025-08-18T11:20:00Z',
      writerId: 2,
      categoryId: 102,
      favoriteCount: 8,
      reviewCount: 5,
      rating: 3.9,
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/832/1756526130023/image.png',
      name: '휴대용 보조 배터리',
      id: 2,
    },
    {
      updatedAt: '2025-08-28T19:00:00Z',
      createdAt: '2025-08-15T08:40:00Z',
      writerId: 3,
      categoryId: 103,
      favoriteCount: 25,
      reviewCount: 10,
      rating: 4.8,
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/832/1756526130023/image.png',
      name: '게이밍 키보드',
      id: 3,
    },
    {
      updatedAt: '2025-08-27T08:45:00Z',
      createdAt: '2025-08-10T12:15:00Z',
      writerId: 4,
      categoryId: 104,
      favoriteCount: 5,
      reviewCount: 2,
      rating: 3.2,
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/832/1756526130023/image.png',
      name: '스마트 워치',
      id: 4,
    },
    {
      updatedAt: '2025-08-25T17:20:00Z',
      createdAt: '2025-08-05T09:50:00Z',
      writerId: 5,
      categoryId: 105,
      favoriteCount: 15,
      reviewCount: 7,
      rating: 4.1,
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/832/1756526130023/image.png',
      name: '프리미엄 노트북 가방',
      id: 5,
    },
  ],
};
