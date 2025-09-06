import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    state: {
      control: 'select',
      options: ['default', 'active', 'disabled'],
    },
    // disabled prop을 boolean 토글로 설정
    disabled: {
      control: 'boolean',
    },
    // intent는 각 스토리에서 고정되므로, 컨트롤 패널에서 숨깁니다.
    intent: { table: { disable: true } },
    // children도 숨깁니다.
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Primary 버튼 스토리
export const Primary: Story = {
  args: {
    intent: 'primary',
    state: 'default', // 초기 상태
    children: 'Primary Button', // 초기 텍스트
  },
};

// Secondary 버튼 스토리
export const Secondary: Story = {
  args: {
    intent: 'secondary',
    state: 'default',
    children: 'Secondary Button',
  },
};

// Tertiary 버튼 스토리
export const Tertiary: Story = {
  args: {
    intent: 'tertiary',
    state: 'default',
    children: 'Tertiary Button',
  },
};
