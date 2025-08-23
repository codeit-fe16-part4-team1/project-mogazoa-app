'use client';

import { JSX, useState } from 'react';
import { getMyProfileAPI } from '@/api/user/getMyProfileAPI';
import { getUserFollowsAPI, GetUserFollowPayload } from '@/api/user/getUserFollowsAPI';
import { getUserProductsAPI, GetUserProductsPayload } from '@/api/user/getUserProductsAPI';
import { getUserProfileAPI } from '@/api/user/getUserProfileAPI';
import { getUserRankingAPI, GetUserRankingResponse } from '@/api/user/getUserRankingAPI';
import {
  updateMyProfileAPI,
  UpdateMyProfilePayload,
  UpdateMyProfileResponse,
} from '@/api/user/updateMyProfileAPI';
import { Profile, ProductsList } from '@/types/api';

type ApiResponse =
  | Profile
  | ProductsList
  | GetUserRankingResponse[]
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

    if (Array.isArray(response)) {
      return (
        <div className='mt-4 p-4 bg-gray-50 rounded'>
          <h4 className='font-semibold mb-2'>Response (Array):</h4>
          {response.length === 0 ? (
            <p>Empty array</p>
          ) : (
            <ul className='space-y-2'>
              {response.map((item, index) => (
                <li key={index} className='p-2 bg-white rounded border'>
                  <pre className='text-sm'>{JSON.stringify(item, null, 2)}</pre>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    if (typeof response === 'object' && 'list' in response) {
      const productsList = response as ProductsList;
      return (
        <div className='mt-4 p-4 bg-gray-50 rounded'>
          <h4 className='font-semibold mb-2'>Response (ProductsList):</h4>
          <p className='mb-2'>
            <strong>Next Cursor:</strong> {productsList.nextCursor}
          </p>
          <h5 className='font-medium mb-2'>Products:</h5>
          {productsList.list.length === 0 ? (
            <p>No products</p>
          ) : (
            <ul className='space-y-2'>
              {productsList.list.map((item, index) => (
                <li key={index} className='p-2 bg-white rounded border'>
                  <pre className='text-sm'>{JSON.stringify(item, null, 2)}</pre>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    return (
      <div className='mt-4 p-4 bg-gray-50 rounded'>
        <h4 className='font-semibold mb-2'>Response:</h4>
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
    <div className='border rounded-lg p-6 mb-6'>
      <h2 className='text-xl font-semibold mb-4'>{title}</h2>

      {formInputs && <div className='mb-4'>{formInputs}</div>}

      <button
        onClick={() => handleApiCall(apiName, apiFunction)}
        disabled={loading[apiName]}
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300'
      >
        {loading[apiName] ? 'Loading...' : `Call ${title} API`}
      </button>

      {errors[apiName] && (
        <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded text-red-700'>
          <strong>Error:</strong> {errors[apiName]}
        </div>
      )}

      {responses[apiName] && renderResponse(responses[apiName])}
    </div>
  );

  return (
    <div className='container mx-auto p-6 max-w-4xl'>
      <h1 className='text-3xl font-bold mb-8'>User API Test Page</h1>

      {renderApiSection('Get My Profile', 'getMyProfile', () => getMyProfileAPI())}

      {renderApiSection(
        'Get User Follows',
        'getUserFollows',
        () => getUserFollowsAPI(getUserFollowsForm),
        <div className='grid grid-cols-3 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>User ID:</label>
            <input
              type='number'
              value={getUserFollowsForm.userId}
              onChange={(e) =>
                setGetUserFollowsForm((prev) => ({
                  ...prev,
                  userId: parseInt(e.target.value) || 0,
                }))
              }
              className='w-full p-2 border rounded'
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Cursor:</label>
            <input
              type='number'
              value={getUserFollowsForm.cursor || 0}
              onChange={(e) =>
                setGetUserFollowsForm((prev) => ({
                  ...prev,
                  cursor: parseInt(e.target.value) || 0,
                }))
              }
              className='w-full p-2 border rounded'
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Type:</label>
            <select
              value={getUserFollowsForm.type}
              onChange={(e) =>
                setGetUserFollowsForm((prev) => ({
                  ...prev,
                  type: e.target.value as 'followers' | 'followees',
                }))
              }
              className='w-full p-2 border rounded'
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
            <label className='block text-sm font-medium mb-1'>User ID:</label>
            <input
              type='number'
              value={getUserProductsForm.userId}
              onChange={(e) =>
                setGetUserProductsForm((prev) => ({
                  ...prev,
                  userId: parseInt(e.target.value) || 0,
                }))
              }
              className='w-full p-2 border rounded'
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Cursor:</label>
            <input
              type='number'
              value={getUserProductsForm.cursor || 0}
              onChange={(e) =>
                setGetUserProductsForm((prev) => ({
                  ...prev,
                  cursor: parseInt(e.target.value) || 0,
                }))
              }
              className='w-full p-2 border rounded'
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Type:</label>
            <select
              value={getUserProductsForm.type}
              onChange={(e) =>
                setGetUserProductsForm((prev) => ({
                  ...prev,
                  type: e.target.value as 'created' | 'reviewed' | 'favorite',
                }))
              }
              className='w-full p-2 border rounded'
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
          <label className='block text-sm font-medium mb-1'>User ID:</label>
          <input
            type='number'
            value={getUserProfileForm.userId}
            onChange={(e) =>
              setGetUserProfileForm((prev) => ({
                ...prev,
                userId: parseInt(e.target.value) || 0,
              }))
            }
            className='w-full p-2 border rounded max-w-xs'
          />
        </div>,
      )}

      {renderApiSection('Get User Ranking', 'getUserRanking', () => getUserRankingAPI())}

      {renderApiSection(
        'Update My Profile',
        'updateMyProfile',
        () => updateMyProfileAPI(updateMyProfileForm),
        <div className='grid grid-cols-1 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Description:</label>
            <textarea
              value={updateMyProfileForm.description}
              onChange={(e) =>
                setUpdateMyProfileForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className='w-full p-2 border rounded'
              rows={3}
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Nickname:</label>
            <input
              type='text'
              value={updateMyProfileForm.nickname}
              onChange={(e) =>
                setUpdateMyProfileForm((prev) => ({
                  ...prev,
                  nickname: e.target.value,
                }))
              }
              className='w-full p-2 border rounded'
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Image URL:</label>
            <input
              type='text'
              value={updateMyProfileForm.image}
              onChange={(e) =>
                setUpdateMyProfileForm((prev) => ({
                  ...prev,
                  image: e.target.value,
                }))
              }
              className='w-full p-2 border rounded'
            />
          </div>
        </div>,
      )}
    </div>
  );
}
