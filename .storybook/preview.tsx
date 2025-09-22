import type { Preview } from '@storybook/nextjs';
import '@/app/globals.css';
import './preview.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Storybook 환경에서 네트워크 요청을 다시 보내지 않도록 설정
      staleTime: Infinity,
    },
  },
});

// 모든 스토리에 QueryClientProvider를 적용하는 데코레이터
const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  ),
];

const preview: Preview = {
  decorators,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
