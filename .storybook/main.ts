import type { StorybookConfig } from '@storybook/nextjs';
import type { RuleSetRule } from 'webpack';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@chromatic-com/storybook', '@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],

  webpackFinal: async (config) => {
    // 기존 SVG 파일 로더 규칙 찾기
    const imageRule = config.module?.rules?.find((rule) => {
      const ruleSetRule = rule as RuleSetRule;
      if (ruleSetRule.test instanceof RegExp) {
        return ruleSetRule.test.test('.svg');
      }
      return false;
    }) as RuleSetRule;

    if (imageRule) {
      imageRule.exclude = /\.svg$/;
    }

    // SVG를 React 컴포넌트로 처리하는 규칙 추가
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default config;
