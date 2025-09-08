// next.config.ts
import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';
import { IMAGE_PATTERNS } from './config/imageConfig';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: IMAGE_PATTERNS,
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
  webpack(config: WebpackConfig) {
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
