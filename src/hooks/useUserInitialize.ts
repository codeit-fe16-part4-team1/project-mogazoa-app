'use client';

import { useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';

const useUserInitialize = () => {
  const { userInitialize } = useAuthStore();
  useEffect(() => {
    userInitialize();
  }, [userInitialize]);

  return null;
};

export default useUserInitialize;
