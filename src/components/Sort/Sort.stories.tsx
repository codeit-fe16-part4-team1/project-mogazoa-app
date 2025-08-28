import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Sort from './Sort';

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
  },
};

export default meta;

type Story = StoryObj<typeof Sort>;

export const Default: Story = {
  args: {
    size: 'S',
  },
};

export const Large: Story = {
  args: {
    size: 'L',
  },
};

export const Responsive: Story = {
  args: {
    size: 'mq',
  },
};
