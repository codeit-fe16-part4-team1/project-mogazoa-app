'use client';

import { useEffect } from 'react';

import useAuthStore from '@/store/useAuthStore';

interface Props {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const { userInitialize } = useAuthStore();
  useEffect(() => {
    userInitialize();
  }, [userInitialize]);

  return <>{children}</>;
};
