import axios from 'axios';
import { redirect } from 'next/navigation';
import { getAccessToken } from './getAccessToken';

export const baseAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20000,
});

baseAPI.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

baseAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      const isServer = typeof window === 'undefined';
      if (!isServer) {
        alert('로그인이 필요한 서비스입니다.');
        redirect('/signin');
      }
    }
    return Promise.reject(error);
  },
);
