import path from 'path';
import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'juln-rc',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  alias: {
    'juln-rc': path.resolve(__dirname, './src'),
    '@': path.resolve(__dirname, './src')
  },
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English']
  ],
  theme: {
    '@c-primary': 'black',
    '@c-heading': '#2b2a2a',
    '@c-text': 'gray'
  },
  navs: [
    {
      title: '指南',
      path: '/guide',
    },
    {
      title: '组件',
      path: '/components',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/z-juln/juln-rc',
    },
  ],
  cssLoader: {
    localsConvention: 'camelCase'
  },
  publicPath: '/juln-rc/',
  base: '/juln-rc/'
  // more config: https://d.umijs.org/config
});
