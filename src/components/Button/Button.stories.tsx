import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '기본 버튼',
  },
};

export const Outline: Story = {
  args: {
    children: '아웃라인 버튼',
    variant: 'outline',
  },
};

export const Destructive: Story = {
  args: {
    children: '삭제 버튼',
    variant: 'destructive',
  },
};

export const Large: Story = {
  args: {
    children: '큰 버튼',
    size: 'lg',
  },
};

export const SmallDisabled: Story = {
  args: {
    children: '작은 비활성 버튼',
    size: 'sm',
    disabled: true,
  },
};
