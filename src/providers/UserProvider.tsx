'use client';

import useAuthStore from '@/store/useAuthStore';
import { useEffect } from 'react';

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
