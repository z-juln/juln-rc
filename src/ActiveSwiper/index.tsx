import React, { memo, useEffect, useState } from 'react';
import { Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import './index.less';
/* import types */
import type { Swiper as SwiperInstance } from 'swiper';
import type { SwiperProps } from 'swiper/react/swiper-react';
import { getPrefixCls } from '@/utils';

export const prefixCls = getPrefixCls('ActiveSwiper');

export interface ActiveSwiperProps extends SwiperProps {
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
}

export const PlainSwiperWidthActive: React.FC<ActiveSwiperProps> = ({
  defaultActiveIndex = 0,
  activeIndex: forceActiveIndex,
  children: createChildren,
  slidesPerView = 2,
  deviation = 0,
  onChangeActiveIndex,
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
      className={prefixCls}
      slidesPerView={slidesPerView}
      {...restProps}
      modules={[Controller]}
      onSwiper={setSwiperController}
      controller={{ control: swiperController }}
    >
      {contents.map((content, index) => (
        <SwiperSlide
          key={index}
          className={`${prefixCls}-slide`}
          onClick={() => toggleActiveIndex(index)}
        >
          <div className={
            `${prefixCls}-option ${activeIndex === index ? `${prefixCls}-option-active` : ''}`
          }>
            {content}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default memo(PlainSwiperWidthActive);
