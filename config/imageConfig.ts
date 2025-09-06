// config/imageConfig.ts
export const IMAGE_PATTERNS = [
  {
    protocol: 'https' as const,
    hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
    port: '',
    pathname: '/**',
  },
];

export const isAllowedImageUrl = (url: string): boolean => {
  if (!url) return false;
  if (url.startsWith('/')) return true; // public 폴더 이미지
  if (url.startsWith('blob:')) return true; //blob 이미지
  try {
    const urlObj = new URL(url);

    return IMAGE_PATTERNS.some((pattern) => {
      const protocolMatch = urlObj.protocol.slice(0, -1) === pattern.protocol;
      const hostnameMatch = urlObj.hostname === pattern.hostname;

      return protocolMatch && hostnameMatch;
    });
  } catch {
    return false;
  }
};
