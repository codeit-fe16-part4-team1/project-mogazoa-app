import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextArea } from './TextArea';
import { TextAreaSchema } from '@/lib/validations';
import z from 'zod';
import { Button } from '../Button/Button';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: ['register'], // 자동 감지된 register prop 제외
    },
  },
  tags: ['autodocs'],
  argTypes: {
    maxLength: {
      control: { type: 'number' },
      description: 'Maximum character length',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic TextArea story
export const Default: Story = {
  args: {
    placeholder: 'Enter your text here...',
    maxLength: 10,
  },
};

// TextArea with form validation
export const WithValidation: Story = {
  render: (args) => {
    const schema = z.object({
      newTextArea1: TextAreaSchema(args.maxLength || 100),
      newTextArea2: TextAreaSchema(args.maxLength || 100),
    });
    type SigninFormInputs = z.infer<typeof schema>;
    const {
      register,
      formState: { isValid },
    } = useForm<SigninFormInputs>({
      resolver: zodResolver(schema),
      mode: 'onChange',
    });

    console.log(`isValid: ${isValid}`);

    return (
      <div className='flex w-96 flex-col items-center gap-4'>
        <TextArea {...args} register={register('newTextArea1')} />
        <TextArea {...args} register={register('newTextArea2')} />
        <Button disabled={!isValid} type='submit'>
          제출
        </Button>
      </div>
    );
  },
  args: {
    placeholder: '값을 입력하세요',
    maxLength: 50,
  },
};
