---
title: Tabs
order: 0
nav:
  path: /components
  title: 组件
group:
  title: 通用
  order: 1
demo:
  cols: 3
---

## Tabs

基于swiper/react实现

### 基础功能

<code src='./demos/demo1/index.tsx'>普通风格</code>
<code src='./demos/demo2/index.tsx' title="滑动风格1 默认" description="鼠标右滑可看到第三个tab"></code>
<code src='./demos/demo3/index.tsx' title="滑动风格2 使用deviation" description="效果可以与 `滑动风格1` 对比。在 `滑动风格1` 中，点击tab2，始终滑动展示第一页；在 `滑动风格2` 中，点击tab2，始终滑动展示第二页。这就是 `deviation` 的其中一个作用"></code>

## API

以下 是ActiveSwiper的功能属性，其他属性皆与 **swiper** 一致.

注: Tabs 需要开启 swiper 的 setWrapperSize, 这个属性不可修改!!!

| 属性                | 说明                                                            | 类型                                 | 默认值 |
| ------------------- | --------------------------------------------------------------- | ------------------------------------ | ------ |
| defaultActiveIndex  | --                                                              | number                               | 0      |
| activeIndex         | 当前激活下标，会覆盖defaultActiveIndex                          | number                               | --     |
| children            | --                                                              | (activeIndex: number) => ReactNode[] | (必选) |
| slidesPerView       | 与 swiper 的 slidesPerView 作用一致，但参数类型和默认值不同     | number                               | 2      |
| deviation           | tab切换时的所展示的页面的下标偏移                               | number                               | 0      |
| onChangeActiveIndex | --                                                              | (activeIndex: number) => void        | --     |
| swiperSlideProps    | SwiperSlide属性: <https://swiperjs.com/react#swiperslide-props> | SwiperSlideProps                     | --     |

swiper属性: <https://swiperjs.com/react#swiper-props>
