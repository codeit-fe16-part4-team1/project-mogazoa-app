import { useCallback, useEffect, useState } from 'react';
import { isAllowedImageUrl } from '../../config/imageConfig';

export const useSafeImageUrl = (imageUrl: string, fallback: string) => {
  const getValidUrl = useCallback(
    (url: string) => {
      return isAllowedImageUrl(url) ? url : fallback;
    },
    [fallback],
  );

  const [safeImageUrl, setSafeImageUrl] = useState(() => getValidUrl(imageUrl));

  const onError = () => {
    setSafeImageUrl(fallback);
  };

  useEffect(() => {
    setSafeImageUrl(getValidUrl(imageUrl));
  }, [imageUrl, fallback, getValidUrl]);

  return {
    safeImageUrl,
    onError,
  };
};
