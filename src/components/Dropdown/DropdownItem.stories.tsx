import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DropdownItem from './DropdownItem';

const meta: Meta<typeof DropdownItem> = {
  title: 'Components/DropdownItem',
  component: DropdownItem,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '아이템에 표시될 텍스트입니다.',
    },
    size: {
      control: 'select',
      options: ['S', 'L', 'mq'],
      description: '아이템의 크기입니다.',
    },
    isSelected: {
      control: 'boolean',
      description: '아이템이 선택되었는지 여부입니다.',
    },
  },
};

export default meta;

export const Default: StoryObj<typeof DropdownItem> = {
  args: {
    label: '아이템',
    isSelected: false,
    size: 'S',
  },
};

export const Selected: StoryObj<typeof DropdownItem> = {
  args: {
    label: '선택된 아이템',
    isSelected: true,
    size: 'S',
  },
};

export const Large: StoryObj<typeof DropdownItem> = {
  args: {
    label: '아이템 S',
    isSelected: false,
    size: 'L',
  },
};
