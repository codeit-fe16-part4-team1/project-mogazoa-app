import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState, ReactNode } from 'react';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';

type OptionalChildrenProps = Omit<React.ComponentProps<typeof Dropdown>, 'children'> & {
  children?: ReactNode;
};

// 메타 데이터 정의
const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    initialValue: {
      control: 'text',
      description: '드롭다운의 초기값',
      table: { type: { summary: 'string | null' } },
    },
    placeholder: {
      control: 'text',
      description: '드롭다운에 선택된 값이 없을 때 표시되는 텍스트',
      table: { type: { summary: 'string | null' } },
    },
    size: {
      control: 'radio',
      options: ['S', 'L'],
      description: '드롭다운의 크기',
      table: { type: { summary: "'S' | 'L'" } },
    },
    onChange: {
      action: 'onChange',
      description: '값이 변경되었을 때 호출되는 함수',
    },
    children: {
      control: false,
      description: '드롭다운 아이템 목록',
    },
  },
};

export default meta;

type Story = StoryObj<OptionalChildrenProps>;

// 카테고리 Dropdown 스토리 (L 사이즈)
export const Category: Story = {
  render: (args) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
      args.initialValue || null,
    );
    return (
      <Dropdown
        {...args}
        initialValue={selectedCategory}
        onChange={setSelectedCategory}
        placeholder='카테고리 선택'
        size='L'
      >
        <DropdownItem label='음악' value='music' />
        <DropdownItem label='영화/드라마' value='movie' />
        <DropdownItem label='게임' value='game' />
        <DropdownItem label='스포츠' value='sports' />
      </Dropdown>
    );
  },
  args: {
    initialValue: null,
    placeholder: '카테고리 선택',
    onChange: () => {},
    size: 'L',
  } as OptionalChildrenProps,
};

// 정렬 Dropdown 스토리 (S 사이즈)
export const Sort: Story = {
  render: (args) => {
    const [sortValue, setSortValue] = useState<string | null>(
      (args.initialValue as string) || 'recent',
    );
    return (
      <Dropdown {...args} initialValue={sortValue} onChange={setSortValue} size='S'>
        <DropdownItem label='최신순' value='recent' />
        <DropdownItem label='별점 높은순' value='rating_desc' />
        <DropdownItem label='별점 낮은순' value='rating_asc' />
        <DropdownItem label='좋아요순' value='favoriteCount' />
      </Dropdown>
    );
  },
  args: {
    initialValue: 'recent',
    onChange: () => {},
    size: 'S',
  } as OptionalChildrenProps,
};
