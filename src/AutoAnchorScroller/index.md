---
title: AutoAnchorScroller 滚动联动组件
order: 1
nav:
  path: /components
group:
  title: 特殊
  order: 2
demo:
  cols: 2
---

## AutoAnchorScroller 滚动联动组件

滚动联动组件。

- 左边为锚点列表，右边为展示列表
- 左边会跟随右边同步滚动

### 基础功能

<style>
  #autoanchorscroller-demo-demo2 > .dumi-default-previewer-demo {
    display: none;
  }
</style>

<code src='./demos/demo1/index.tsx'>demo1</code> <code src='./demos/demo2/index.tsx' title="demo2" description="请访问: [Demo2](/juln-rc/~demos/autoanchorscroller-demo-demo2)"></code>

## API

children: ;

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 需要使用多个该组件时，传 id 可以避免多个组件的冲突 | string | -- |
| anchors | 锚点列表 | { label: string; value: string; } | (必选) |
| height | 容器高度 | number / string | -- |
| children |  | Children 对象 | (必选) |
| opts | 滚动等细节配置 | Opts 对象 | -- |

### Children

| 属性   | 说明        | 类型                                         | 默认值 |
| ------ | ----------- | -------------------------------------------- | ------ |
| anchor | 锚点元素    | (anchor: Anchor, index: number) => ReactNode | (必选) |
| slider | slider 元素 | (anchor: Anchor, index: number) => ReactNode | (必选) |

### Opts

| 属性            | 说明                                                      | 类型    | 默认值 |
| --------------- | --------------------------------------------------------- | ------- | ------ |
| scrollDelay     |                                                           | number  | 200    |
| smooth          | 是否开启平滑滚动(smooth 模式目前会有闪烁的 bug，尚未解决) | boolean | true   |
| activeDeviation | 联动的滚动偏移量                                          | number  | 0      |
