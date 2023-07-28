---
title: ModalHandler 弹窗手柄
order: 1
nav:
  path: /components
group:
  title: 通用
  order: 1
demo:
  cols: 3
---

## ModalHandler 弹窗手柄

### 基础功能

<style>
  .dumi-default-previewer-demo > iframe {
    height: 180px;
  }
</style>

<code src='./demos/demo1/index.tsx'>click模式(默认)</code>
<code src='./demos/demo2/index.tsx' title='maskClosable模式' description='点击其他区域时会关闭Modal'></code>
<code src='./demos/demo3/index.tsx'>hover模式</code>
<code src='./demos/demo4/index.tsx' title='destroyOnClose模式' description='每次关闭时都销毁Modal'></code>

## API

| 属性      | 说明            | 类型               | 默认值  |
| --------- | --------------- | ------------------ | ------- |
| className | --              | string             | --      |
| open      | --              | boolean            | false   |
| setOpen   | --              | (value: A) => void | --      |
| openMode  | 打开Modal的方式 | 'hover' \| 'click' | 'click' |
| icon      | --              | ReactNode          | (必选)  |
| modal     | --              | Modal 对象         | (必选)  |

### Modal

| 属性           | 说明                     | 类型                                                              | 默认值                  |
| -------------- | ------------------------ | ----------------------------------------------------------------- | ----------------------- |
| maskClosable   | --                       | boolean                                                           | false                   |
| destroyOnClose | --                       | boolean                                                           | false                   |
| node           | --                       | ReactNode                                                         | (必选)                  |
| absoluteStyle  | Modal相对于handler的位置 | Pick<React.CSSProperties, 'top' \| 'left' \| 'right' \| 'bottom'> | { bottom: 0, right: 0 } |
