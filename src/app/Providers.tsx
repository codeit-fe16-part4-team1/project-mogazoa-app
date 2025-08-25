'use client';
import useKakaoInitialize from '@/hooks/useKakaoInitialize';
import useUserInitialize from '@/hooks/useUserInitialize';
import { getQueryClient } from '@/lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  const queryClient = getQueryClient();
  useUserInitialize();
  useKakaoInitialize();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
