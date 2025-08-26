export interface User {
  id: number;
  email: string;
  description: string;
  image: string;
  teamId: string;
  nickname: string;
  updatedAt: string;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface Profile {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
  mostFavoriteCategory: {
    name: string;
    id: number;
  };
  averageRating: number;
  reviewCount: number;
  followeesCount: number;
  followersCount: number;
  isFollowing: boolean;
}

export interface ProductItem {
  updatedAt: string;
  createdAt: string;
  writerId: number;
  categoryId: number;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  image: string;
  name: string;
  id: number;
}

export interface ProductsList {
  nextCursor: number;
  list: ProductItem[];
}
