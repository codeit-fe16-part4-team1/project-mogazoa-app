'use client';

import { signInAPI, SignInPayload } from '@/api/auth/signInAPI';
import { signOutAPI } from '@/api/auth/signOutAPI';
import { signUpAPI, SignUpPayload } from '@/api/auth/signUpAPI';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import Cookies from 'js-cookie';

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

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  signup: (payload: SignUpPayload) => Promise<void>;
  signin: (payload: SignInPayload) => Promise<void>;
  signout: () => Promise<void>;
  userInitialize: () => void;
}

const useAuthStore = create<AuthStore>()(
  devtools((set, get) => ({
    isAuthenticated: false,
    user: null,
    signup: async (payload) => {
      const user = await signUpAPI(payload);
      if (user) {
        set({ isAuthenticated: true, user });
        localStorage.setItem('user', JSON.stringify(user));
        console.log('[DEBUG] Signup Success');
      }
    },
    signin: async (payload) => {
      const user = await signInAPI(payload);
      if (user) {
        set({ isAuthenticated: true, user });
        localStorage.setItem('user', JSON.stringify(user));
        console.log('[DEBUG] Signin Success');
      }
    },
    signout: async () => {
      await signOutAPI();
      set({ isAuthenticated: false, user: null });
      localStorage.removeItem('user');
      console.log('[DEBUG] Signout Success');
    },
    userInitialize: () => {
      const accessToken = Cookies.get('accessToken');
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      // accessToken이 있고 storage에 user가 있을 경우 => user set 처리
      if (accessToken && user) {
        set({ isAuthenticated: true, user });
        console.log('[DEBUG] User Reload Success');
      } else if (!accessToken && user) {
        get().signout();
        console.log('[DEBUG] Session Timeout');
      }
    },
  })),
);

export default useAuthStore;
