import { IMAGE_PATTERNS } from './config/imageConfig.js';

const nextConfig = {
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
  webpack(config) {
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
