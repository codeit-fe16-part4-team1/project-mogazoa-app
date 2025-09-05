// next.config.ts
import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';
import { IMAGE_PATTERNS } from './config/imageConfig';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: IMAGE_PATTERNS,
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
