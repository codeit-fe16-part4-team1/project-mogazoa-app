import type { Meta, StoryObj } from '@storybook/nextjs';

import { ThreeDotsIndicator } from './ThreeDotIndicator';

const meta = {
  title: 'Components/ThreeDotsIndicator',
  component: ThreeDotsIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    dotColor: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary'],
      table: {
        type: { summary: "'default' | 'primary'" },
        defaultValue: { summary: "'default'" },
      },
    },
    className: {
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof ThreeDotsIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dotColor: 'default',
  },
};

export const Primary: Story = {
  args: {
    dotColor: 'primary',
  },
};
