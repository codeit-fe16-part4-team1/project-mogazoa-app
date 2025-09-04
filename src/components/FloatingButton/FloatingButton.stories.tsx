import type { Meta, StoryObj } from '@storybook/nextjs';
import EditBtnIcon from '@/assets/icons/icon_product_edit.svg';
import PlusBtnIcon from '@/assets/icons/icon_plus.svg';

import FloatingButton from './FloatingButton';

const meta: Meta<typeof FloatingButton> = {
  title: 'Components/FloatingButton',
  component: FloatingButton,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: '버튼에 추가할 Tailwind CSS 클래스',
    },
    children: {
      control: 'text',
      description: '버튼 내부에 들어갈 내용 (아이콘, 텍스트 등)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <EditBtnIcon className='size-6 fill-white' />, // children prop의 기본값
  },
};

export const WithBackgroundColor: Story = {
  args: {
    children: <PlusBtnIcon />,
    className: 'bg-primary-orange-600 text-white hover:bg-primary-orange-700',
  },
};

export const WithDifferentSize: Story = {
  args: {
    children: '✔️',
    className: 'size-20',
  },
};
