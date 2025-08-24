'use client';
import useKakaoInitialize from '@/hooks/useKakaoInitialize';
import useUserInitialize from '@/hooks/useUserInitialize';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient());
  useKakaoInitialize();
  useUserInitialize();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
