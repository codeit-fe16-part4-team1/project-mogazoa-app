import type { Meta, StoryObj } from '@storybook/nextjs';

import ThumbsUpLikes from './ThumbsUpLikes';

const meta = {
  title: 'Components/ThumbsUpLikes',
  component: ThumbsUpLikes,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    likes: {
      control: 'number',
      description: '좋아요 수',
    },
    liked: {
      control: 'boolean',
      description: '좋아요 상태',
    },
  },
} satisfies Meta<typeof ThumbsUpLikes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { productId: 0, reviewId: 0, likes: 123, liked: false, order: 'recent' },
};

export const Liked: Story = {
  args: { productId: 0, reviewId: 0, likes: 123, liked: true, order: 'recent' },
};
