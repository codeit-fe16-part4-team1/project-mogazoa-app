import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Sort from './Sort';

const sortOptions = ['최신순', '별점 높은순', '별점 낮은순', '좋아요순'];

const SortWrapper = (args: React.ComponentProps<typeof Sort>) => {
  const [value, setValue] = useState(sortOptions[0]);
  return <Sort {...args} value={value} onChange={setValue} />;
};

const meta: Meta<typeof Sort> = {
  title: 'Components/Sort',
  component: Sort,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'radio',
      },
      options: ['S', 'L', 'mq'],
    },
    value: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Sort>;

export const Default: Story = {
  render: SortWrapper,
  args: {
    size: 'S',
  },
};

export const Large: Story = {
  render: SortWrapper,
  args: {
    size: 'L',
  },
};

export const Responsive: Story = {
  render: SortWrapper,
  args: {
    size: 'mq',
  },
};
