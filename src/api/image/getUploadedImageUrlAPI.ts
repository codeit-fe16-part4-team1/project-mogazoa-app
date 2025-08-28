import { baseAPI } from '@/lib/baseAPI';

interface GetUploadedImageUrlPayload {
  file: File;
}

interface GetUploadedImageUrlResponse {
  url: string;
}

export const getUploadedImageUrlAPI = async ({
  file,
}: GetUploadedImageUrlPayload): Promise<GetUploadedImageUrlResponse> => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await baseAPI.post('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
