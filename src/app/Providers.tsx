'use client';
import { KakaoProvider } from '@/providers/KakaoProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { UserProvider } from '@/providers/UserProvider';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <QueryProvider>
      <KakaoProvider>
        <UserProvider>{children}</UserProvider>
      </KakaoProvider>
    </QueryProvider>
  );
};
