import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/nextjs';
import z from 'zod';

import { TextAreaSchema } from '@/lib/validations';

import { Button } from '../Button/Button';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: ['register', 'error', 'watchValue'], // 자동 감지된 register prop 제외
    },
  },
  tags: ['autodocs'],
  argTypes: {
    minLength: {
      control: { type: 'number' },
      description: 'Minimum character length',
    },
    maxLength: {
      control: { type: 'number' },
      description: 'Maximum character length',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic TextArea story
export const Default: Story = {
  args: {
    placeholder: 'Enter your text here...',
    minLength: 1,
    maxLength: 10,
  },
};

// Basic TextArea width ClassName story
export const DefaultWithClassName: Story = {
  args: {
    placeholder: `with className: 'min-h-32'`,
    minLength: 1,
    maxLength: 10,
    className: 'min-h-32 w-full',
  },
};

// TextArea with form validation
export const WithValidation: Story = {
  render: (args) => {
    const schema = z.object({
      newTextArea1: TextAreaSchema({
        minLength: args.minLength || 1,
        maxLength: args.maxLength || 100,
      }),
      newTextArea2: TextAreaSchema({
        minLength: args.minLength || 1,
        maxLength: args.maxLength || 100,
      }),
    });
    type SigninFormInputs = z.infer<typeof schema>;
    const {
      register,
      formState: { errors, isValid },
      watch,
    } = useForm<SigninFormInputs>({
      resolver: zodResolver(schema),
      mode: 'onChange',
    });

    return (
      <div className='flex w-96 flex-col items-center gap-4'>
        <TextArea
          {...args}
          error={errors.newTextArea1}
          register={register('newTextArea1')}
          watchValue={watch('newTextArea1')}
        />
        <TextArea
          {...args}
          error={errors.newTextArea2}
          register={register('newTextArea2')}
          watchValue={watch('newTextArea2')}
        />
        <Button disabled={!isValid} type='submit'>
          제출
        </Button>
      </div>
    );
  },
  args: {
    placeholder: '값을 입력하세요',
    minLength: 10,
    maxLength: 50,
  },
};

// TextArea with form validation
export const WithValidationAndInitialValue: Story = {
  render: (args) => {
    const schema = z.object({
      newTextArea1: TextAreaSchema({
        minLength: args.minLength || 1,
        maxLength: args.maxLength || 100,
      }),
      newTextArea2: TextAreaSchema({
        minLength: args.minLength || 1,
        maxLength: args.maxLength || 100,
      }),
    });
    type SigninFormInputs = z.infer<typeof schema>;
    const {
      register,
      formState: { errors, isValid },
      watch,
    } = useForm<SigninFormInputs>({
      resolver: zodResolver(schema),
      mode: 'onChange',
      defaultValues: {
        newTextArea1: '초기값입니다초기값입니다',
        newTextArea2: '초기값입니다초기값입니다',
      },
    });

    return (
      <div className='flex w-96 flex-col items-center gap-4'>
        <TextArea
          {...args}
          error={errors.newTextArea1}
          register={register('newTextArea1')}
          watchValue={watch('newTextArea1')}
        />
        <TextArea
          {...args}
          error={errors.newTextArea2}
          register={register('newTextArea2')}
          watchValue={watch('newTextArea2')}
        />
        <p>{errors.newTextArea2?.message}</p>
        <Button disabled={!isValid} type='submit'>
          제출
        </Button>
      </div>
    );
  },
  args: {
    placeholder: '값을 입력하세요',
    minLength: 10,
    maxLength: 50,
  },
};
