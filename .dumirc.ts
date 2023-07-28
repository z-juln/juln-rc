import { defineConfig } from 'dumi';
import path from 'path';

const globalCss = `
  <style>
    .dumi-default-sidebar {
      width: max-content;
    }
  </style>
`;

export default defineConfig({
  title: 'juln-rc',
  outputPath: 'docs-dist',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  themeConfig: {
    name: 'juln-rc',
    footer: 'Copyright © 2023 | Powered by <a href="https://z-juln.github.io/juln-rc/" target="_blank" rel="noreferrer">juln-rc</a>' + globalCss,
    socialLinks: {
      github: 'https://github.com/z-juln/juln-rc',
    },
  },
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
  alias: {
    'juln-rc': path.resolve(__dirname, './src'),
    '@': path.resolve(__dirname, './src'),
  },
  resolve: {
    entryFile: './src/index.ts',
  },
  apiParser: {},
  theme: {
    '@c-primary': 'black',
    '@c-heading': '#2b2a2a',
    '@c-text': 'gray'
  },
  publicPath: '/juln-rc/',
  base: '/juln-rc/',
  // more config: https://d.umijs.org/config
});
