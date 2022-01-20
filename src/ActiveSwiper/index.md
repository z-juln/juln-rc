---
title: ActiveSwiper
order: 0
nav:
  path: /components
---

## ActiveSwiper

基于swiper/react实现

### 基础功能

#### Demo1, 两个tab:

<code src='./demos/demo1/index.tsx'></code>

#### Demo2, 三个tab:

鼠标右滑可看到第三个tab

<code src='./demos/demo2/index.tsx'></code>

<Alert type='info'>注: 需要手动加样式: `.swiper-wrapper { width: 300px; }`</Alert>

### deviation

#### Demo3, 三个tab:

效果可以与 `Demo2` 对比。在 `Demo2` 中，点击tab2，始终滑动展示第一页；在 `Demo3` 中，点击tab2，始终滑动展示第二页。这就是 `deviation` 的其中一个作用。

<code src='./demos/demo3/index.tsx'></code>

## API

以下 `defaultActiveIndex`, `activeIndex`, `deviation`, `slidesPerView`, `onChangeActiveIndex`, `children` 是ActiveSwiper的特有属性，其他属性皆与 **swiper** 一致，但不保证都能发挥正常效果.

<API hideTitle></API>
