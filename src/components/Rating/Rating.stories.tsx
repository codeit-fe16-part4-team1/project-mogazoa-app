import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Rating from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    rating: {
      control: { type: 'number', min: 0, max: 5 },
      description: '초기 별점 값을 설정',
    },
    readonly: {
      control: 'boolean',
      description: '읽기 전용 모드를 활성화',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: '별점 아이콘의 크기를 설정',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: {
    rating: 3,
    size: 'md',
  },
};

export const Readonly: Story = {
  args: {
    rating: 4,
    size: 'sm',
    readonly: true,
  },
};
