import axios from 'axios';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';

export const baseAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20000,
});

baseAPI.interceptors.request.use(async (config) => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    const { cookies } = await import('next/headers');
    const token = (await cookies()).get('accessToken')?.value;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    const token = Cookies.get('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

baseAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      alert('로그인이 필요한 서비스입니다.');
      redirect('/signin');
    }
    return Promise.reject(error);
  },
);
