import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/nextjs';
import z from 'zod';

import Input, { InputSchema } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: ['register', 'error', 'initialValue'], // 자동 감지된 register prop 제외
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['L', 'S'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    id: 'large-input',
    size: 'L',
    type: 'text',
    placeholder: '텍스트를 입력해 주세요',
  },
};

export const Small: Story = {
  args: {
    id: 'small-input',
    size: 'S',
    type: 'text',
    placeholder: '텍스트를 입력해 주세요',
  },
};

export const WithInitialValueAndHint: Story = {
  render: () => {
    const schema = z.object({
      input: InputSchema({ minLength: 1, maxLength: 10 }),
    });

    const {
      register,
      formState: { errors },
      watch,
    } = useForm({
      resolver: zodResolver(schema),
      mode: 'onChange',
      defaultValues: { input: 'Valid text' },
    });

    return (
      <div>
        <Input
          id='valid-input'
          size='L'
          type='text'
          placeholder='텍스트를 입력해 주세요'
          register={register('input')}
          error={errors.input}
          watchValue={watch('input')}
        />
        <p>{errors.input?.message}</p>
      </div>
    );
  },
};
