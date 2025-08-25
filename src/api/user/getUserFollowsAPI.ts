import { baseAPI } from '@/lib/baseAPI';

type Follows = 'followers' | 'followees';

export interface GetUserFollowPayload {
  userId: number;
  cursor?: number;
  type: Follows;
}

export interface FollowUser {
  updatedAt: string;
  createdAt: string;
  teamId: string;
  image: string;
  description: string;
  nickname: string;
  id: number;
}

export type FollowUserItem = {
  id: number;
} & {
  [K in Follows]: FollowUser;
};

export interface GetUserFollowResponse {
  nextCursor: number;
  list: FollowUserItem[];
}

export const getUserFollowsAPI = async ({
  userId,
  cursor,
  type,
}: GetUserFollowPayload): Promise<GetUserFollowResponse> => {
  const cursorQuery = cursor ? `?cursor=${cursor}` : '';
  const res = await baseAPI.get(`/users/${userId}/${type}${cursorQuery}`);
  return res.data;
};
