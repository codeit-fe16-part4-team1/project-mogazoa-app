import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ImageInput, { getInitialImageList, ImageInputSchema } from './ImageInput';

const meta: Meta<typeof ImageInput> = {
  title: 'Components/ImageInput',
  component: ImageInput,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    maxImageCount: {
      control: 'number',
      defaultValue: 3,
    },
    value: {
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageInput>;

// 기본 ImageInput 스토리
export const Default: Story = {
  args: {
    value: {},
    maxImageCount: 3,
  },
};

// 기본 ImageInput 스토리
export const DefaultSingle: Story = {
  args: {
    value: {},
    maxImageCount: 1,
  },
};

// 기본값이 있는 ImageInput 스토리
export const WithInitialImages: Story = {
  args: {
    value: getInitialImageList([
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/832/1756312692708/image.png',
    ]),
    maxImageCount: 3,
  },
};

// 최대 5개까지 선택 가능한 ImageInput 스토리
export const MaxFiveImages: Story = {
  args: {
    value: {},
    maxImageCount: 5,
  },
};

// React Hook Form과 함께 사용하는 스토리
const FormWrapper = ({ maxImageCount }: { maxImageCount: number }) => {
  const schema = z.object({
    images: ImageInputSchema(maxImageCount),
    title: z.string().min(1, '제목을 입력해주세요'),
  });
  type FormData = z.infer<typeof schema>;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      images: getInitialImageList([]),
      title: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label htmlFor='title' className='mb-2 block text-sm font-medium'>
          제품명
        </label>
        <input
          id='title'
          {...register('title')}
          className='w-full rounded-lg border border-gray-300 p-2'
          placeholder='제품명을 입력하세요'
        />
        {errors.title && <p className='mt-1 text-sm text-red-500'>{errors.title.message}</p>}
      </div>

      <div>
        <label className='mb-2 block text-sm font-medium'>이미지 ({maxImageCount}개까지)</label>
        <Controller
          name='images'
          control={control}
          render={({ field }) => (
            <ImageInput
              value={field.value}
              onChange={field.onChange}
              maxImageCount={maxImageCount}
            />
          )}
        />
      </div>

      <button
        type='submit'
        disabled={!isValid}
        className={`rounded-lg px-4 py-2 ${
          isValid
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'cursor-not-allowed bg-gray-300 text-gray-500'
        }`}
      >
        제출하기 {isValid ? '✓' : '✗'}
      </button>
    </form>
  );
};

export const WithReactHookForm: Story = {
  render: () => <FormWrapper maxImageCount={3} />,
  parameters: {
    docs: {
      description: {
        story:
          'React Hook Form과 함께 사용하는 예시입니다. 제목 입력과 이미지 선택 모두 유효성 검사가 적용됩니다.',
      },
    },
  },
};

export const WithReactHookFormMax5: Story = {
  render: () => <FormWrapper maxImageCount={5} />,
  parameters: {
    docs: {
      description: {
        story: '최대 5개 이미지와 React Hook Form을 함께 사용하는 예시입니다.',
      },
    },
  },
};

// React Hook Form과 함께 사용하는 스토리 - Required false
const FormWrapperOptional = ({ maxImageCount }: { maxImageCount: number }) => {
  const schema = z.object({
    images: ImageInputSchema(maxImageCount, false),
    title: z.string().min(1, '제목을 입력해주세요'),
  });
  type FormData = z.infer<typeof schema>;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      images: getInitialImageList([]),
      title: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label htmlFor='title' className='mb-2 block text-sm font-medium'>
          제품명
        </label>
        <input
          id='title'
          {...register('title')}
          className='w-full rounded-lg border border-gray-300 p-2'
          placeholder='제품명을 입력하세요'
        />
        {errors.title && <p className='mt-1 text-sm text-red-500'>{errors.title.message}</p>}
      </div>

      <div>
        <label className='mb-2 block text-sm font-medium'>
          이미지 (선택사항, {maxImageCount}개까지)
        </label>
        <Controller
          name='images'
          control={control}
          render={({ field }) => (
            <ImageInput
              value={field.value}
              onChange={field.onChange}
              maxImageCount={maxImageCount}
            />
          )}
        />
      </div>

      <button
        type='submit'
        disabled={!isValid}
        className={`rounded-lg px-4 py-2 ${
          isValid
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'cursor-not-allowed bg-gray-300 text-gray-500'
        }`}
      >
        제출하기 {isValid ? '✓' : '✗'}
      </button>
    </form>
  );
};

export const OptionalImageInput: Story = {
  render: () => <FormWrapperOptional maxImageCount={3} />,
  parameters: {
    docs: {
      description: {
        story:
          'required=false로 설정된 ImageInput 예시입니다. 이미지 선택 없이도 폼 제출이 가능합니다.',
      },
    },
  },
};
