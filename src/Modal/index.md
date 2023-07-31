---
title: Modal
order: 0
nav:
  path: /components
  title: 组件
group:
  title: 通用
  order: 1
demo:
  cols: 2
---

## Modal

模态对话框.

### 基础功能

<code src='./demos/demo1/index.tsx' title='Alert' description='带有title、message的弹窗<br />close关闭弹窗用法'>Alert</code><code src='./demos/demo2/index.tsx' title='Confirm' description='带title、message、cancel、ok按钮的弹窗<br/>异步action'></code><code src='./demos/demo3/index.tsx'>ConfirmOnlyBtn</code><code src='./demos/demo4/index.tsx'>ConfirmOnlyTitle</code><code src='./demos/demo5/index.tsx'>ConfirmCustomTitle</code><code src='./demos/demo6/index.tsx'>ColumnsBtns</code>

## API

`Modal.alert`

### 参数

```typescript
interface AlertArgument {
  title: React.ReactNode;
  message: React.ReactNode;
  actions?: Action[];
  className?: string;
  style?: React.CSSProperties;
}

interface Action {
  text: React.ReactNode;
  onPress?: () => void | Promise<void>;
  closeModal?: () => void;
  style?: React.CSSProperties;
}
```

### 返回值

```typescript
type ReturnValue = { close: () => void };
```
