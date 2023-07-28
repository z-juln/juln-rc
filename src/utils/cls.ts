import classnames, { ArgumentArray } from "classnames";

export const basicPrefix = 'juln-rc';

export const getPrefix = (subPrefix: string) => `${basicPrefix}-${subPrefix}`;

const getClsWithPrefix = (subPrefix: string) => {
  const prefix = getPrefix(subPrefix);
  const cls = (...args: ArgumentArray): string => {
    if (args.length === 0) return prefix;
    return classnames(args.map(arg => {
      if (typeof arg === 'string') {
        return arg === '' ? prefix : `${prefix}__${arg}`;
      } else if (Array.isArray(arg)) {
        return arg.map(a => cls(a)).join(' ');
      } else {
        return Object.entries(arg as any).filter(([_, v]) => v).map(([arg]) => arg === '' ? prefix : `${prefix}__${arg}`);
      }
    }));
  };
  return cls;
};

export default getClsWithPrefix;

const doTest = () => {
  const btnCls = getClsWithPrefix('button');

  console.log(btnCls()); // 'juln-rc-button'
  console.log(btnCls('foo', 'bar')); // 'juln-rc-button__foo juln-rc-button__bar'
  console.log(btnCls('foo', { bar: true })); // 'juln-rc-button__foo juln-rc-button__bar'
  console.log(classnames([{ bar: true }, { bar: false }])); // 'bar'
  console.log(btnCls({ bar: true }, { a: false })); // 'juln-rc-button__bar'
  console.log(btnCls({ 'foo-bar': true })); // 'juln-rc-button__foo-bar'
  console.log(btnCls({ 'foo-bar': false })); // ''
  console.log(btnCls({ foo: true }, { bar: true })); // 'juln-rc-button__foo juln-rc-button__bar'
  console.log(btnCls({ foo: true, bar: true })); // 'juln-rc-button__foo juln-rc-button__bar'
  console.log(btnCls('foo', ['bar', ''])); // 'juln-rc-button__foo juln-rc-button__bar juln-rc-button'
  console.log(btnCls('foo', ['bar', 'baz'])); // 'juln-rc-button__foo juln-rc-button__bar juln-rc-button__baz'
};

// doTest();
