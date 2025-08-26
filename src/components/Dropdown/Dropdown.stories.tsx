import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Dropdown from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    items: { control: { type: 'array' }, description: '드롭다운에 표시될 아이템들의 배열입니다.' },
    placeholder: { control: 'text', description: '선택전 표시될 기본 텍스트입니다.' },
    size: {
      control: 'select',
      options: ['S', 'L', 'mq'],
      description: '드롭다운 아이템의 크기입니다.',
    },
  },
  args: {
    items: ['음악', '영화/드라마', '강의/책', '호텔', '가구/인테리어'],
    placeholder: '카테고리 선택',
    size: 'S',
  },
};

export default meta;

export const S: StoryObj<typeof Dropdown> = {
  args: {
    size: 'S',
  },
};

export const L: StoryObj<typeof Dropdown> = {
  args: {
    size: 'L',
  },
};

export const Mq: StoryObj<typeof Dropdown> = {
  args: {
    size: 'mq',
  },
};
