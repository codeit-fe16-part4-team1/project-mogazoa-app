'use client';

import { Controller, FieldError, FieldErrors, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import z from 'zod';

import { createProduct } from '@/api/product/createProduct';
import { updateProduct, UpdateProductPayload } from '@/api/product/updateProduct';
import { Button } from '@/components/Button/Button';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog/core/DialogComponents';
import Dropdown from '@/components/Dropdown/Dropdown';
import { productKeys } from '@/constant/queryKeys';
import { useCategoryMap } from '@/hooks/useCategoryMap';
import useDialog from '@/hooks/useDialog';
import { TextAreaSchema } from '@/lib/validations';
import { ProductFormDialogProps } from '@/types/dialogProps.types';

import DropdownItem from '../Dropdown/DropdownItem';
import ImageInput, {
  getInitialImageList,
  getUploadedImageUrlArray,
  ImageInputSchema,
} from '../ImageInput/ImageInput';
import Input, { InputSchema } from '../Input/Input';
import RequiredLabel from '../RequiredLabel/RequiredLabel';
import { TextArea } from '../TextArea/TextArea';

const ProductFormDialog = ({
  mode,
  productId,
  categoryId,
  imageUrl,
  productName,
  productDescription,
}: ProductFormDialogProps) => {
  if (mode === 'edit' && !productId) throw new Error('ProductFormDialog Props Error');

  const productFormSchema = z.object({
    image: ImageInputSchema(1),
    categoryId: z.string().refine((id) => id !== '0', { message: '카테고리를 선택해주세요.' }),
    productName: InputSchema({ minLength: 1, maxLength: 20 }),
    productDescription: TextAreaSchema({ maxLength: 300, minLength: 10 }),
  });

  type ProductFormData = z.infer<typeof productFormSchema>;

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
    watch,
    getValues,
    setError,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    mode: 'onBlur',
    defaultValues: {
      image: imageUrl ? getInitialImageList([imageUrl]) : getInitialImageList([]),
      categoryId: categoryId === undefined ? '0' : String(categoryId),
      productName: productName || '',
      productDescription: productDescription || '',
    },
  });

  const queryClient = useQueryClient();
  const { closeAll, closeAllAndRoute } = useDialog();

  const { categoryData } = useCategoryMap();

  const { mutate: createMutate, isPending: createIsPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      closeAllAndRoute(`/product/${data.id}`);
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response) {
        const responseData = error.response.data;

        if (responseData.details && responseData.details.name) {
          const errorMessage = responseData.details.name.message;
          setError('productName', { message: errorMessage });
        }
      } else {
        alert('알 수 없는 에러가 발생했습니다.');
      }
    },
  });

  const { mutate: updateMutate, isPending: updateIsPending } = useMutation({
    mutationFn: (args: UpdateProductPayload & { productId: number }) => {
      const { productId, ...payload } = args;
      return updateProduct(productId, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      closeAll();
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response) {
        const responseData = error.response.data;
        if (responseData.details && responseData.details.name) {
          const errorMessage = responseData.details.name.message;
          setError('productName', { message: errorMessage });
        }
      } else {
        alert('알 수 없는 에러가 발생했습니다.');
      }
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    const imageUrls = await getUploadedImageUrlArray(getValues('image'));

    const submitData = {
      categoryId: +data.categoryId,
      image: imageUrls[0],
      name: data.productName,
      description: data.productDescription,
    };

    if (mode === 'create') createMutate(submitData);
    else if (productId) updateMutate({ productId, ...submitData });
  };

  const onInvalid = (errors: FieldErrors<ProductFormData>) => {
    console.log('폼 제출 실패. 에러 객체:', errors);
  };

  return (
    <DialogContent className='w-84 gap-7 overflow-x-hidden border-none px-5 py-10 md:w-161 md:gap-10 md:border-none md:px-13 md:py-12'>
      {/* Header */}
      <DialogHeader>
        <DialogTitle>상품 {mode === 'create' ? '추가' : '편집'}</DialogTitle>
      </DialogHeader>
      <form
        className='flex w-full max-w-75 flex-col gap-4 md:max-w-136 md:gap-5'
        method={mode === 'create' ? 'POST' : 'PATCH'}
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <div>
          <RequiredLabel className='text-caption-bold md:text-body2-bold mb-1 inline-block text-gray-900'>
            상품 이미지
          </RequiredLabel>
          <Controller
            name='image'
            control={control}
            render={({ field }) => (
              <ImageInput
                maxImageCount={1}
                value={field.value}
                onChange={field.onChange}
                singleImageMode
              />
            )}
          />
          {errors.image && 'message' in errors.image && (
            <p className='text-caption md:text-body2 text-state-error mt-1'>
              {(errors.image as unknown as FieldError).message}
            </p>
          )}
        </div>
        <div>
          <RequiredLabel className='text-caption-bold md:text-body2-bold mb-1 inline-block text-gray-900'>
            카테고리
          </RequiredLabel>
          <Controller
            name='categoryId'
            control={control}
            render={({ field }) => (
              <Dropdown
                initialValue={field.value}
                onChange={field.onChange}
                placeholder='카테고리 선택'
                size='L'
              >
                {categoryData?.map((category) => (
                  <DropdownItem
                    key={category.id}
                    label={category.name}
                    value={String(category.id)}
                  />
                ))}
              </Dropdown>
            )}
          />
          {errors.categoryId && (
            <p className='text-caption md:text-body2 text-state-error mt-1'>
              {errors.categoryId?.message}
            </p>
          )}
        </div>
        <div>
          <RequiredLabel
            className='text-caption-bold md:text-body2-bold mb-1 inline-block text-gray-900'
            htmlFor='productName'
          >
            상품명
          </RequiredLabel>
          <Input
            id='productName'
            size='S'
            type='text'
            placeholder='상품명 (상품 등록 여부를 확인해주세요)'
            register={register('productName')}
            error={errors.productName}
            watchValue={watch('productName')}
          />
          {errors.productName && (
            <p className='text-caption md:text-body2 text-state-error mt-1'>
              {errors.productName?.message}
            </p>
          )}
        </div>
        <div>
          <RequiredLabel
            className='text-caption-bold md:text-body2-bold mb-1 inline-block text-gray-900'
            htmlFor='productDescription'
          >
            상품 설명
          </RequiredLabel>
          <TextArea
            id='productDescription'
            className='min-h-45 border-gray-300 break-words md:min-h-60 md:px-3 md:pt-3 md:pl-3'
            register={register('productDescription')}
            watchValue={watch('productDescription')}
            defaultValue={productDescription}
            placeholder='상품에 대한 설명을 작성해주세요'
            error={errors.productDescription}
            //isSubmitted={isSubmitted}
            maxLength={300}
          />
          {errors.productDescription && (
            <p className='text-caption md:text-body2 text-state-error mt-1'>
              {errors.productDescription?.message}
            </p>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className='flex-between-center mt-2 w-full md:mt-5'>
          <Button
            className='w-full'
            type='submit'
            size='S'
            disabled={!isValid || createIsPending || updateIsPending}
          >
            {mode === 'create' ? '추가' : '수정'}하기
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ProductFormDialog;
