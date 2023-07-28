import getClsWithPrefix from '@/utils/cls';
import React, { memo, useEffect, useState } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';
import { Controller } from 'swiper/modules';
import {
  Swiper,
  SwiperProps,
  SwiperSlide,
  SwiperSlideProps,
} from 'swiper/react';
import { ControllerOptions, SwiperOptions } from 'swiper/types';
import './index.less';

const subPrefix = 'Tabs';
const cls$ = getClsWithPrefix(subPrefix);

export interface TabsProps
  extends Omit<SwiperProps, 'setWrapperSize' | 'children'> {
  defaultActiveIndex?: number;
  /** 当前激活下标，会覆盖defaultActiveIndex */
  activeIndex?: number;
  /** -- */
  children: (activeIndex: number) => React.ReactNode[];
  /** 与 swiper 的 slidesPerView 作用一致，但参数类型和默认值不同 */
  slidesPerView?: number;
  /** tab切换时的所展示的页面的下标偏移 */
  deviation?: number;
  onChangeActiveIndex?: (activeIndex: number) => void;
  swiperSlideProps?: SwiperSlideProps;
}

const Tabs: React.FC<TabsProps> = ({
  className = '',
  defaultActiveIndex = 0,
  activeIndex: forceActiveIndex,
  children: createChildren,
  slidesPerView = 2,
  deviation = 0,
  onChangeActiveIndex,
  swiperSlideProps,
  ...restProps
}) => {
  const [swiperController, setSwiperController] = useState<SwiperInstance>();
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  useEffect(() => {
    if (typeof forceActiveIndex === 'number') {
      setActiveIndex(forceActiveIndex);
    }
  }, [forceActiveIndex]);

  useEffect(() => {
    let pageIndex = activeIndex;
    if (deviation) {
      pageIndex += deviation;
    }
    swiperController?.slideTo(pageIndex);
  }, [activeIndex, swiperController]);

  const contents = createChildren(activeIndex);

  const toggleActiveIndex = (activeIndex: number) => {
    setActiveIndex(activeIndex);
    onChangeActiveIndex?.(activeIndex);
  };

  return (
    <Swiper
      {...restProps}
      className={`${cls$()} ${className}`}
      slidesPerView={slidesPerView}
      modules={
        restProps?.modules?.includes(Controller)
          ? restProps?.modules
          : [Controller, ...(restProps?.modules ?? [])]
      }
      onSwiper={(...args) => {
        setSwiperController(...args);
        restProps?.onSwiper?.(...args);
      }}
      setWrapperSize
      controller={getControllerProp({
        innerSwiperController: swiperController,
        userController: restProps?.controller,
      })}
    >
      {contents.map((content, index) => (
        <SwiperSlide
          {...swiperSlideProps}
          className={`${cls$('slide')} ${swiperSlideProps?.className ?? ''}`}
          onClick={(...args) => {
            toggleActiveIndex(index);
            swiperSlideProps?.onClick?.(...args);
          }}
        >
          <div
            className={cls$('option', {
              'option--active': activeIndex === index,
            })}
          >
            {content}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default memo(Tabs);

const getControllerProp = ({
  userController,
  innerSwiperController,
}: {
  /** 用户传进来的controller属性 */
  userController?: ControllerOptions;
  /** 组件内部依赖的swiperController */
  innerSwiperController?: SwiperInstance;
}): SwiperOptions['controller'] => {
  const userControl = userController?.control;
  const control: ControllerOptions['control'] = innerSwiperController
    ? [innerSwiperController]
    : [];
  if (Array.isArray(userControl)) {
    control.push(...userControl);
  } else if (userControl) {
    control.push(userControl as any);
  }
  return {
    ...userController,
    control,
  };
};
