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

````typescript
interface AlertArgument {
  title: React.ReactNode;
  message: React.ReactNode;
  /** 默认为```{ actions: [{ text: '确定' }], direction: 'row' }``` */
  actionProps?: {
    actions?: Action[];
    direction?: 'row' | 'column';
  };
  className?: string;
  style?: React.CSSProperties;
  /** 默认999 */
  zIndex?: number;
}

interface Action {
  text: React.ReactNode;
  onPress?: () => void | Promise<void>;
  closeModal?: () => void;
  style?: React.CSSProperties;
}
````

### 返回值

```typescript
type ReturnValue = { close: () => void };
```

### 用户自定义样式, 可套用模板

```less
@prefix: ~'juln-rc-Modal';

// 公用样式
.@{prefix} {
  .@{prefix}-footer {
    // TODO
    .@{prefix}__button {
      // TODO
    }
  }
}

// help-utils
.primary-button() {
  // TODO
}

// 只有title，没有message时的样式
.@{prefix}.@{prefix}__only-title {
  // TODO
}

// 按钮组横向排列时的样式
.@{prefix} .@{prefix}__button-direction-row {
  display: flex;
  justify-content: space-between;
  // TODO
  .@{prefix}__button {
    // TODO
    &:nth-child(2) {
      // TODO
      .primary-button();
    }
  }

  // 横向 + 唯一button
  &.@{prefix}__only-button {
    // TODO
    .@{prefix}__button {
      // TODO
      .primary-button();
    }
  }
}

// 按钮组纵向排列时的样式
.@{prefix} .@{prefix}__button-direction-column {
  display: flex;
  flex-direction: column;
  // TODO
  .@{prefix}__button {
    // TODO
    &:first-child {
      .primary-button();
    }
    & + .@{prefix}__button {
      // TODO
    }
  }

  // 纵向 + 唯一button
  &.@{prefix}__only-button {
    // TODO
  }
}
```
