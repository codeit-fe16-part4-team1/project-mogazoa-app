import type { Meta, StoryObj, StoryFn } from '@storybook/nextjs';

import { CategorieChip } from './CategorieChip';
import { useCategoryMap } from '@/hooks/useCategoryMap';

const meta: Meta<typeof CategorieChip> = {
  title: 'Components/CategorieChip',
  component: CategorieChip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CategorieChip>;

const Template: StoryFn<typeof CategorieChip> = (args) => {
  const { categoryData } = useCategoryMap();
  console.log(categoryData);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {categoryData?.map((category) => (
        <CategorieChip key={category.id} {...args} categoryId={category.id} />
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
