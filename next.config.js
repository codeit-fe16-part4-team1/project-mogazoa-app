import { IMAGE_PATTERNS } from './config/imageConfig.js';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig = {
  images: {
    remotePatterns: IMAGE_PATTERNS,
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 500],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://t1.kakaocdn.net; object-src 'none';",
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
