import inquirer from 'inquirer';
import fs from 'fs';
import { getAbsPath, getCompDirsSync } from './utils/index.js';

/** Type
 * 不管component还是subComponent，都会在/src/index.ts中生成导出代码
 * component: 普通组件，比如antd的button组件。
 *   路径为/src/<component-name>，创建时会生成demos目录，__test__目录等等。
 * subComponent: 子级组件，比如antd的button下的button-group组件。
 *   要求先选择某个普通组件，如antd的button，然后生成/src/Button/ButtonGroup.tsx文件，
 *   同时在/src/Button/demos目录下生成对应的demo，目录名格式为ButtonGroup-demo1。
 */
const Type = {
  component: 'component',
  subComponent: 'subComponent',
};

const pathChoices = getCompDirsSync().map((dirname) => `/src/${dirname}`);

inquirer
  .prompt([
    {
      name: 'type',
      type: 'list',
      message: '请选择要创建的类型',
      default: 'component',
      choices: Object.values(Type),
    },
    {
      name: 'name',
      type: 'input',
      message: '请输入名称(纯英文大驼峰)',
      validate(name, { type }) {
        const done = this.async();
        const inputValid = /^[A-Z][A-Za-z]+$/.test(name);
        if (!inputValid) {
          done('名称不合法', false);
          return;
        }
        if (type === Type.component && pathChoices.includes(`/src/${name}`)) {
          done('组件已存在，你是否要创建子级组件，是的话类型请选择subComponent', false);
          return;
        }
        done(null, true);
      },
    },
    {
      name: 'path',
      type: 'list',
      when: ({ type }) => type === Type.subComponent,
      choices: pathChoices,
      message: '请输入创建的目录路径（必须 /src/ 开头）',
    },
  ])
  .then(({ type, name, path }) => {
    if (type === Type.component) {
      path = `/src/${name}`;
    }
    const absPath = getAbsPath(path);
    createTemplate({ type, name, absPath });
  });

const createTemplate = ({ type, name, absPath }) => {
  // console.log('createTemplate: ', { type, name, path: absPath });
  if (type === Type.component) {
    fs.mkdirSync(absPath);
  }
  // ...
};
