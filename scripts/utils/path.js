import path from 'path';
import url from 'url';
import fs from 'fs';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/**
 * @param {string} p 必须已'/'开头, 如 /src/Demo
 * @returns '/Users/zhuangjunlin/my-project/juln-rc/src/Demo'
 */
export const getAbsPath = (p) => path.resolve(__dirname, '../../', `.${p}`);

export const srcPath = getAbsPath('/src');

export const template = getAbsPath('/scripts/template');

export const getCompDirsSync = () =>
  fs
    .readdirSync(srcPath)
    .filter((dir) => !['.umi', '.umi-production', 'style', 'utils', 'index.ts'].includes(dir));
