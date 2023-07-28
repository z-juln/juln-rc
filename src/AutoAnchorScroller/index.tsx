import getClsWithPrefix, { basicPrefix } from '@/utils/cls';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { throttle } from 'throttle-debounce';
import { Anchor, getAnchorByValue, getSingleActiveAnchor } from './anchor';
import './index.less';
import { LinkInfo, getLinkInfo, getNextLinkInfo } from './linkInfo';

const subPrefix = 'AutoAnchorScroller';
const cls$ = getClsWithPrefix(subPrefix);

export interface Opts {
  scrollDelay?: number;
  /** smooth模式目前会有闪烁的bug，尚未解决 */
  smooth?: boolean;
  activeDeviation?: number;
}

export interface AutoAnchorScrollerProps {
  /** 需要使用多个该组件时，传id可以避免多个组件的冲突 */
  id?: string;
  anchors: Omit<Anchor, 'actived'>[];
  height?: number | string;
  children: {
    anchor: (anchor: Anchor, index: number) => ReactNode;
    slider: (anchor: Anchor, index: number) => ReactNode;
  };
  opts?: Opts;
}

const initialOpts = {
  scrollDelay: 200,
  smooth: true,
  activeDeviation: 0,
};

/**
 * 1. 目前只支持纵向滚动
 * 2. 组件参数anchors改变时，需要手动在组件外围添加key使组件强制刷新
 */
export const AutoAnchorScroller: React.FC<AutoAnchorScrollerProps> = ({
  id,
  anchors: initialAnchors,
  children: { anchor: createAnchorEl, slider: createSlider },
  height,
  opts: _opts,
}: AutoAnchorScrollerProps) => {
  const opts = Object.assign(initialOpts, _opts);

  const [linkInfoList, setLinkInfoList] = useState<LinkInfo[] | null>();
  const [anchors, setAnchors] = useState<Anchor[]>(initialAnchors);
  const activedAnchor = useMemo(
    () => anchors.find((anchor) => anchor.actived) ?? null,
    [anchors],
  );
  const [manuallyAnchoring, setManuallyAnchoring] = useState(false); // 是否正处于手动点击anchor的动画过程中
  const [canUseOnScroll, setCanUseOnScroll] = useState(true); // 手动anchor时，禁用onScroll

  useEffect(() => {
    collectSliderList();
  }, []);

  useEffect(() => {
    if (linkInfoList) {
      throttledOnScoll();
    }
  }, [linkInfoList]);

  const throttledOnScoll = useMemo(
    () =>
      throttle(opts.scrollDelay, () => {
        if (canUseOnScroll) {
          onScoll(linkInfoList ?? [], doActiveAnchor, {
            activeDeviation: opts.activeDeviation,
          });
        } else {
          scrollMiddleController();
        }
      }),
    [opts.scrollDelay, linkInfoList, manuallyAnchoring],
  );

  function collectSliderList() {
    const linkInfoList: (LinkInfo | null)[] = anchors.map((anchor) => {
      const sliderEl = getSliderEl(anchor.value, id);
      const wrapperEl = getWrapperEl(id);
      if (sliderEl && wrapperEl) {
        const linkInfo: LinkInfo = {
          anchor,
          offsetTop: sliderEl.offsetTop - wrapperEl.offsetTop,
        };
        return linkInfo;
      }
      return null;
    });

    setLinkInfoList(linkInfoList.filter(Boolean) as LinkInfo[]);
  }

  function onClickAnchor(anchorValue: Anchor['value']) {
    setManuallyAnchoring(true);
    doActiveAnchor(anchorValue);
    scrollTo(anchorValue, linkInfoList ?? [], {
      smooth: opts.smooth,
      superId: id,
      activeDeviation: opts.activeDeviation,
    }).then(() => setManuallyAnchoring(false));
  }

  useEffect(() => {
    if (!manuallyAnchoring && !canUseOnScroll) {
      setCanUseOnScroll(true);
    }
  }, [manuallyAnchoring]);

  function scrollMiddleController() {
    // scrollMiddleController本质也是个onScroll,当这个onScroll触发时，就停止手动anchor事件
    if (manuallyAnchoring) {
      setManuallyAnchoring(false);
    }
  }

  function doActiveAnchor(anchorValue: Anchor['value']) {
    setAnchors((anchors) => {
      const targetAnchor = getAnchorByValue(anchors, anchorValue);
      if (!targetAnchor) {
        return anchors;
      }
      const anchorNativeEl = getAnchorEl(anchorValue, id);
      anchorNativeEl?.scrollIntoView();
      const newAnchors = getSingleActiveAnchor(anchors, targetAnchor);
      return newAnchors;
    });
  }

  function onScoll(
    linkInfoList: LinkInfo[],
    onActive: (anchorValue: Anchor['value'], isEnd?: boolean) => void,
    opts: OnScollOpts = {},
  ) {
    const activeDeviation = opts.activeDeviation ?? initialOpts.activeDeviation;
    const { superId } = opts;

    const wrapperEl = getWrapperEl(superId);

    if (requireHandleActive()) {
      // 找到第一个匹配的anchor，并激活它
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < linkInfoList.length; index++) {
        const { offsetTop: sliderOffsetTop, anchor } = linkInfoList[index];

        if (sliderBelowWrapper(wrapperEl, sliderOffsetTop, activeDeviation)) {
          const isEnd = !!activedAnchor && anchor.value === activedAnchor.value;
          onActive(anchor.value, isEnd);
          return;
        }
      }
    }

    function sliderBelowWrapper(
      wrapperEl: Element | null | undefined,
      sliderOffsetTop: number | null | undefined,
      activeDeviation: number,
    ): boolean {
      return (
        !!wrapperEl &&
        typeof sliderOffsetTop === 'number' &&
        wrapperEl.scrollTop <= sliderOffsetTop - activeDeviation
      );
    }

    // 优化: 判断是否需要更新active
    function requireHandleActive(): boolean {
      if (!activedAnchor) return true;

      const linkInfo = getLinkInfo(linkInfoList, activedAnchor.value);
      const nextLinkInfo = linkInfo
        ? getNextLinkInfo(linkInfoList, linkInfo)
        : null;
      if (
        linkInfo &&
        sliderBelowWrapper(wrapperEl, linkInfo.offsetTop, activeDeviation) &&
        nextLinkInfo &&
        !sliderBelowWrapper(wrapperEl, nextLinkInfo.offsetTop, activeDeviation)
      ) {
        return false;
      }
      return true;
    }
  }

  return (
    <div className={cls$()} id={id} style={{ height }}>
      <div className={cls$('sideBar')} style={{ height }}>
        <div className={cls$('sideBar-wrapper')}>
          {anchors.map((anchor, index) => {
            const AnchorEl = createAnchorEl(anchor, index);

            return (
              // eslint-disable-next-line max-len
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
              <li
                onClick={() => onClickAnchor(anchor.value)}
                className={cls$('anchor')}
                key={anchor.value}
                {...{
                  [`data-${basicPrefix}-anchor`]: anchor.value,
                  [`data-${basicPrefix}-anchor-actived`]: anchor.actived,
                }}
              >
                {AnchorEl}
              </li>
            );
          })}
        </div>
      </div>

      <div
        className={cls$('wrapper')}
        onScroll={throttledOnScoll}
        {...{ [`data-${basicPrefix}-anchor-wrapper`]: true }}
        style={{ height }}
      >
        {anchors.map((anchor, index) => {
          const Slider = createSlider(anchor, index);

          return (
            <div
              className={cls$('slider')}
              key={anchor.value}
              {...{ [`data-${basicPrefix}-anchor-slider`]: anchor.value }}
            >
              {Slider}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AutoAnchorScroller;

export type { Anchor } from './anchor';

async function scrollTo(
  anchorValue: Anchor['value'],
  linkInfoList: LinkInfo[],
  opts: { smooth?: boolean; superId?: string; activeDeviation?: number } = {},
) {
  const { superId, smooth, activeDeviation = 0 } = opts;

  const wrapperEl = getWrapperEl(superId);
  const offsetTop = getLinkInfo(linkInfoList, anchorValue)?.offsetTop;

  if (wrapperEl && typeof offsetTop === 'number') {
    wrapperEl.scrollTo({
      behavior: smooth ? 'smooth' : 'auto',
      top: offsetTop + activeDeviation,
    });
  }
}

type OnScollOpts = {
  superId?: string;
  activeDeviation?: Opts['activeDeviation'];
};

/**
 * css选择器的拼接（id为顶级元素的id)
 * @param {string} selector 当前选择器
 * @param {string | undefined} id 顶级元素的id
 * @returns {string} 拼接结果为: `#xxx-id xxx-selector`
 */
function getSelectorWithSuperId(selector: string, id?: string) {
  const idSelector = `${id ? `#${id}` : ''}`;
  return `${idSelector} ${selector}`;
}

function getWrapperEl(id?: string): HTMLDivElement | null {
  const selector = getSelectorWithSuperId(
    `[data-${basicPrefix}-anchor-wrapper]`,
    id,
  );
  return document.querySelector(selector);
}

function getSliderEl(
  anchorValue: Anchor['value'],
  id?: string,
): HTMLDivElement | null {
  const selector = getSelectorWithSuperId(
    `[data-${basicPrefix}-anchor-slider=${anchorValue}]`,
    id,
  );
  return document.querySelector(selector);
}

function getAnchorEl(
  anchorValue: Anchor['value'],
  id?: string,
): HTMLDivElement | null {
  const selector = getSelectorWithSuperId(
    `[data-${basicPrefix}-anchor=${anchorValue}]`,
    id,
  );
  return document.querySelector(selector);
}
