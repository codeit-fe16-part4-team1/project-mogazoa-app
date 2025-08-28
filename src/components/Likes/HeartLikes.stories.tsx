import type { Meta, StoryObj } from '@storybook/nextjs';

import HeartLikes from './HeartLikes';

const meta = {
  title: 'Components/HeartLikes',
  component: HeartLikes,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    liked: {
      control: 'boolean',
      description: '좋아요 상태',
    },
  },
} satisfies Meta<typeof HeartLikes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { liked: false },
};

export const Liked: Story = {
  args: { liked: true },
};
