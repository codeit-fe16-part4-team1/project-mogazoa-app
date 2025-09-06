import type { Meta, StoryObj, StoryFn } from '@storybook/nextjs-vite';

import { CategorieChip } from './CategorieChip';

const meta: Meta<typeof CategorieChip> = {
  title: 'Components/CategorieChip',
  component: CategorieChip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CategorieChip>;

// Template 함수의 타입을 StoryFn으로 명시하고 args를 받도록 합니다.
const Template: StoryFn<typeof CategorieChip> = (args) => {
  const categories = [
    '음악',
    '영화/드라마',
    '강의/책',
    '호텔',
    '가구/인테리어',
    '식당',
    '전자기기',
    '화장품',
    '의류/악세서리',
    '앱',
    '여행',
    '테스트텍스트',
    'test text',
    'Test Text',
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {categories.map((category, index) => (
        // {...args}를 통해 variant prop이 전달됩니다.
        <CategorieChip key={category} {...args} categoryId={index + 1} />
      ))}
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    variant: 'default',
  },
};

export const Outline: Story = {
  render: Template,
  args: {
    variant: 'outline',
  },
};
