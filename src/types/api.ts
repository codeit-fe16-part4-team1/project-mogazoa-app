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

export type UserInfoInReivew = Pick<User, 'id' | 'nickname' | 'image'>;

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

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

type CategoryInProductDetail = Omit<Category, 'createdAt' | 'updatedAt'>;

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

export interface CategoryMetric {
  rating: number;
  favoriteCount: number;
  reviewCount: number;
}

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  favoriteCount: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  writerId: number;
  isFavorite: boolean;
  category: CategoryInProductDetail;
  categoryMetric: CategoryMetric;
}

export interface ReviewImage {
  source: string;
  id: number;
}

export interface Review {
  id: number;
  rating: number;
  content: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  productId: number;
  user: UserInfoInReivew;
  reviewImages: ReviewImage[];
  isLiked: boolean;
}

export interface ReviewListResponse {
  nextCursor: number;
  list: Review[];
}

export type OrderOptions = 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';
