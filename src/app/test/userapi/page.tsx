'use client';

import { JSX, useState } from 'react';

import { getMyProfileAPI } from '@/api/user/getMyProfileAPI';
import {
  GetUserFollowPayload,
  GetUserFollowResponse,
  getUserFollowsAPI,
} from '@/api/user/getUserFollowsAPI';
import { getUserProductsAPI, GetUserProductsPayload } from '@/api/user/getUserProductsAPI';
import { getUserProfileAPI } from '@/api/user/getUserProfileAPI';
import { getUsersRankingAPI } from '@/api/user/getUsersRankingAPI';
import {
  updateMyProfileAPI,
  UpdateMyProfilePayload,
  UpdateMyProfileResponse,
} from '@/api/user/updateMyProfileAPI';
import { ProductsList, Profile, UserRanking } from '@/types/api';

type ApiResponse =
  | GetUserFollowResponse
  | Profile
  | ProductsList
  | UserRanking[]
  | UpdateMyProfileResponse
  | null;

export default function UserApiTestPage() {
  const [responses, setResponses] = useState<Record<string, ApiResponse>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [getUserFollowsForm, setGetUserFollowsForm] = useState<GetUserFollowPayload>({
    userId: 1,
    cursor: 0,
    type: 'followers',
  });

  const [getUserProductsForm, setGetUserProductsForm] = useState<GetUserProductsPayload>({
    userId: 1,
    cursor: 0,
    type: 'created',
  });

  const [getUserProfileForm, setGetUserProfileForm] = useState<{ userId: number }>({
    userId: 1,
  });

  const [updateMyProfileForm, setUpdateMyProfileForm] = useState<UpdateMyProfilePayload>({
    description: '',
    nickname: '',
    image: '',
  });

  const handleApiCall = async (apiName: string, apiFunction: () => Promise<ApiResponse>) => {
    setLoading((prev) => ({ ...prev, [apiName]: true }));
    setErrors((prev) => ({ ...prev, [apiName]: '' }));

    try {
      const response = await apiFunction();
      setResponses((prev) => ({ ...prev, [apiName]: response }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [apiName]: error instanceof Error ? error.message : 'Unknown error',
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [apiName]: false }));
    }
  };

  const renderResponse = (response: ApiResponse) => {
    if (!response) return null;

    // 디버깅을 위한 로그 추가
    console.log('Response type check:', response);
    console.log('Response keys:', Object.keys(response as object));

    if (Array.isArray(response)) {
      return (
        <div className='mt-4 rounded bg-gray-50 p-4'>
          <h4 className='mb-2 font-semibold'>Response (Array):</h4>
          <pre className='text-sm'>{JSON.stringify(response, null, 2)}</pre>
        </div>
      );
    }

    // Follow Users 응답 체크 - 빈 배열이어도 GetUserFollowResponse 타입으로 감지
    if (
      typeof response === 'object' &&
      'nextCursor' in response &&
      'list' in response &&
      Array.isArray((response as GetUserFollowResponse).list)
    ) {
      // list가 비어있지 않으면 첫 번째 아이템에서 followers/followees 키 확인
      const testResponse = response as GetUserFollowResponse;
      const isFollowResponse =
        testResponse.list.length === 0 ||
        (testResponse.list.length > 0 &&
          ('follower' in testResponse.list[0] || 'followee' in testResponse.list[0]));

      if (isFollowResponse) {
        const followResponse = response as GetUserFollowResponse;
        return (
          <div className='mt-4 rounded bg-gray-50 p-4'>
            <h4 className='mb-2 font-semibold'>Response (Follow Users):</h4>
            <pre className='text-sm'>{JSON.stringify(followResponse, null, 2)}</pre>
          </div>
        );
      }
    }

    // ProductsList 응답 체크
    if (typeof response === 'object' && 'list' in response) {
      const productsList = response as ProductsList;
      return (
        <div className='mt-4 rounded bg-gray-50 p-4'>
          <h4 className='mb-2 font-semibold'>Response (ProductsList):</h4>
          <pre className='text-sm'>{JSON.stringify(productsList, null, 2)}</pre>
        </div>
      );
    }

    return (
      <div className='mt-4 rounded bg-gray-50 p-4'>
        <h4 className='mb-2 font-semibold'>Response:</h4>
        <pre className='text-sm'>{JSON.stringify(response, null, 2)}</pre>
      </div>
    );
  };

  const renderApiSection = (
    title: string,
    apiName: string,
    apiFunction: () => Promise<ApiResponse>,
    formInputs?: JSX.Element,
  ) => (
    <div className='mb-6 rounded-lg border p-6'>
      <h2 className='mb-4 text-xl font-semibold'>{title}</h2>

      {formInputs && <div className='mb-4'>{formInputs}</div>}

      <button
        onClick={() => handleApiCall(apiName, apiFunction)}
        disabled={loading[apiName]}
        className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300'
      >
        {loading[apiName] ? 'Loading...' : `Call ${title} API`}
      </button>

      {errors[apiName] && (
        <div className='mt-4 rounded border border-red-200 bg-red-50 p-4 text-red-700'>
          <strong>Error:</strong> {errors[apiName]}
        </div>
      )}

      {responses[apiName] && renderResponse(responses[apiName])}
    </div>
  );

  return (
    <div className='container mx-auto max-w-4xl p-6'>
      <h1 className='mb-8 text-3xl font-bold'>User API Test Page</h1>

      {renderApiSection('Get My Profile', 'getMyProfile', () => getMyProfileAPI())}

      {renderApiSection(
        'Get User Follows',
        'getUserFollows',
        () => getUserFollowsAPI(getUserFollowsForm),
        <div className='grid grid-cols-3 gap-4'>
          <div>
            <label className='mb-1 block text-sm font-medium'>User ID:</label>
            <input
              type='number'
              value={getUserFollowsForm.userId}
              onChange={(e) =>
                setGetUserFollowsForm((prev) => ({
                  ...prev,
                  userId: parseInt(e.target.value) || 0,
                }))
              }
              className='w-full rounded border p-2'
            />
          </div>
          <div>
            <label className='mb-1 block text-sm font-medium'>Cursor:</label>
            <input
              type='number'
              value={getUserFollowsForm.cursor || 0}
              onChange={(e) =>
                setGetUserFollowsForm((prev) => ({
                  ...prev,
                  cursor: parseInt(e.target.value) || 0,
                }))
              }
              className='w-full rounded border p-2'
            />
          </div>
          <div>
            <label className='mb-1 block text-sm font-medium'>Type:</label>
            <select
              value={getUserFollowsForm.type}
              onChange={(e) =>
                setGetUserFollowsForm((prev) => ({
                  ...prev,
                  type: e.target.value as 'followers' | 'followees',
                }))
              }
              className='w-full rounded border p-2'
            >
              <option value='followers'>Followers</option>
              <option value='followees'>Followees</option>
            </select>
          </div>
        </div>,
      )}

      {renderApiSection(
        'Get User Products',
        'getUserProducts',
        () => getUserProductsAPI(getUserProductsForm),
        <div className='grid grid-cols-3 gap-4'>
          <div>
            <label className='mb-1 block text-sm font-medium'>User ID:</label>
            <input
              type='number'
              value={getUserProductsForm.userId}
              onChange={(e) =>
                setGetUserProductsForm((prev) => ({
                  ...prev,
                  userId: parseInt(e.target.value) || 0,
                }))
              }
              className='w-full rounded border p-2'
            />
          </div>
          <div>
            <label className='mb-1 block text-sm font-medium'>Cursor:</label>
            <input
              type='number'
              value={getUserProductsForm.cursor || 0}
              onChange={(e) =>
                setGetUserProductsForm((prev) => ({
                  ...prev,
                  cursor: parseInt(e.target.value) || 0,
                }))
              }
              className='w-full rounded border p-2'
            />
          </div>
          <div>
            <label className='mb-1 block text-sm font-medium'>Type:</label>
            <select
              value={getUserProductsForm.type}
              onChange={(e) =>
                setGetUserProductsForm((prev) => ({
                  ...prev,
                  type: e.target.value as 'created' | 'reviewed' | 'favorite',
                }))
              }
              className='w-full rounded border p-2'
            >
              <option value='created'>Created</option>
              <option value='reviewed'>Reviewed</option>
              <option value='favorite'>Favorite</option>
            </select>
          </div>
        </div>,
      )}

      {renderApiSection(
        'Get User Profile',
        'getUserProfile',
        () => getUserProfileAPI(getUserProfileForm),
        <div>
          <label className='mb-1 block text-sm font-medium'>User ID:</label>
          <input
            type='number'
            value={getUserProfileForm.userId}
            onChange={(e) =>
              setGetUserProfileForm((prev) => ({
                ...prev,
                userId: parseInt(e.target.value) || 0,
              }))
            }
            className='w-full max-w-xs rounded border p-2'
          />
        </div>,
      )}

      {renderApiSection('Get User Ranking', 'getUserRanking', () => getUsersRankingAPI())}

      {renderApiSection(
        'Update My Profile',
        'updateMyProfile',
        () => updateMyProfileAPI(updateMyProfileForm),
        <div className='grid grid-cols-1 gap-4'>
          <div>
            <label className='mb-1 block text-sm font-medium'>Description:</label>
            <textarea
              value={updateMyProfileForm.description}
              onChange={(e) =>
                setUpdateMyProfileForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className='w-full rounded border p-2'
              rows={3}
            />
          </div>
          <div>
            <label className='mb-1 block text-sm font-medium'>Nickname:</label>
            <input
              type='text'
              value={updateMyProfileForm.nickname}
              onChange={(e) =>
                setUpdateMyProfileForm((prev) => ({
                  ...prev,
                  nickname: e.target.value,
                }))
              }
              className='w-full rounded border p-2'
            />
          </div>
          <div>
            <label className='mb-1 block text-sm font-medium'>Image URL:</label>
            <input
              type='text'
              value={updateMyProfileForm.image}
              onChange={(e) =>
                setUpdateMyProfileForm((prev) => ({
                  ...prev,
                  image: e.target.value,
                }))
              }
              className='w-full rounded border p-2'
            />
          </div>
        </div>,
      )}
    </div>
  );
}
