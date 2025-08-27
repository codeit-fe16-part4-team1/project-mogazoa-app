import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Dropdown from './Dropdown';
import DropdownList from './DropdownList';
import DropdownItem from './DropdownItem';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: '선택전 표시될 기본 텍스트입니다.',
    },
    size: {
      control: 'select',
      options: ['S', 'L', 'mq'],
      description: '드롭다운 아이템의 크기입니다.',
    },
  },
  args: {
    placeholder: '카테고리 선택',
    size: 'S',
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

// 기본 드롭다운 스토리
export const Default: Story = {
  args: {
    placeholder: '카테고리 선택',
    size: 'S',
  },
  render: (args) => (
    // Dropdown에 props를 전달하고, 그 안의 DropdownList와 DropdownItem을 렌더링합니다.
    <Dropdown {...args}>
      <DropdownList>
        <DropdownItem label='음악' />
        <DropdownItem label='운동' />
        <DropdownItem label='게임' />
      </DropdownList>
    </Dropdown>
  ),
};

// 큰 사이즈의 드롭다운 스토리
export const Large: Story = {
  args: {
    ...Default.args,
    placeholder: '라지 사이즈',
    size: 'L',
  },
};

// 반응형 사이즈의 드롭다운 스토리
export const Responsive: Story = {
  args: {
    ...Default.args,
    placeholder: '반응형',
    size: 'mq',
  },
};
