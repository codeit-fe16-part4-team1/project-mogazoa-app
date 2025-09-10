'use client';

import { signInAPI, SignInPayload } from '@/api/auth/signInAPI';
import { signOutAPI } from '@/api/auth/signOutAPI';
import { signUpAPI, SignUpPayload } from '@/api/auth/signUpAPI';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User } from '@/types/api';
import { signInKakaoAPI, SignInKakaoPayload } from '@/api/auth/signInKakaoAPI';
import { signUpKakaoAPI, SignUpKakaoPayload } from '@/api/auth/signUpKakaoAPI';
import { getAccessToken } from '@/lib/getAccessToken';

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  setUser: ({ user, type }: { user: User; type: string }) => void;
  resetUser: () => void;
  signup: (payload: SignUpPayload) => Promise<void>;
  signin: (payload: SignInPayload) => Promise<void>;
  signupKakao: (payload: SignUpKakaoPayload) => Promise<void>;
  signinKakao: (payload: SignInKakaoPayload) => Promise<void>;
  signout: () => Promise<void>;
  userInitialize: () => void;
}

const useAuthStore = create<AuthStore>()(
  devtools((set, get) => ({
    isAuthenticated: false,
    user: null,
    setUser: ({ user, type }) => {
      set({ isAuthenticated: true, user });
      localStorage.setItem('user', JSON.stringify(user));
      console.log(`[DEBUG] ${type} Success`);
    },
    resetUser: () => {
      set({ isAuthenticated: false, user: null });
      localStorage.removeItem('user');
      console.log('[DEBUG] SignOut Success');
    },
    signup: async (payload) => {
      const user = await signUpAPI(payload);
      if (user) {
        get().setUser({ user, type: 'SignUp' });
      }
    },
    signin: async (payload) => {
      const user = await signInAPI(payload);
      if (user) {
        get().setUser({ user, type: 'SignIn' });
      }
    },
    signupKakao: async (payload) => {
      const user = await signUpKakaoAPI(payload);
      if (user) {
        get().setUser({ user, type: 'SignUpKakao' });
      }
    },
    signinKakao: async (payload) => {
      const user = await signInKakaoAPI(payload);
      if (user) {
        get().setUser({ user, type: 'SignUpKakao' });
      }
    },
    signout: async () => {
      await signOutAPI();
      get().resetUser();
    },
    userInitialize: async () => {
      const accessToken = await getAccessToken();
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
