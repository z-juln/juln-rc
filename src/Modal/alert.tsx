import classNames from 'classnames';
import { render, unmount } from 'rc-util/lib/React/render';
import * as React from 'react';
import Modal, { cls$ } from '.';
import { Action } from './interface';

const closest = (el: Element, selector: string) => {
  const matchesSelector =
    el.matches ||
    el.webkitMatchesSelector ||
    (el as any).mozMatchesSelector ||
    (el as any).msMatchesSelector;
  let p: Element | null = el;
  while (p) {
    if (matchesSelector.call(p, selector)) {
      return p;
    }
    p = p.parentElement;
  }
  return null;
};

export interface AlertArgument {
  title?: React.ReactNode;
  message?: React.ReactNode;
  actionProps?: {
    actions?: Action[];
    direction?: 'row' | 'column';
  };
  className?: string;
  style?: React.CSSProperties;
}

const alert = ({
  title,
  message,
  actionProps = {
    actions: [{ text: '确定' }],
    direction: 'row',
  },
  className = '',
  style,
}: AlertArgument) => {
  let closed = false;

  if (!title && !message) {
    throw new Error('Must specify either an alert title, or message, or both');
    // return { close: () => {} };
  }

  const div = document.createElement('div');
  document.body.appendChild(div);

  const close = () => {
    unmount(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  };

  const actions = actionProps?.actions?.map((button: Action) => {
    const orginPress = button.onPress || (() => {});
    button.onPress = () => {
      if (closed) {
        return;
      }

      const res = orginPress();
      if (res?.then) {
        res
          .then(() => {
            closed = true;
            close();
          })
          .catch(() => {});
      } else {
        closed = true;
        close();
      }
    };
    button.closeModal = () => {
      closed = true;
      close();
    };
    return button;
  });

  const onWrapTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target as Element, `.${cls$('footer')}`);
    if (!pNode) {
      e.preventDefault();
    }
  };

  // 兼容react18的waring
  render(
    <Modal
      className={classNames(
        {
          [cls$('only-title')]: !message,
        },
        className,
      )}
      visible
      transparent
      title={title}
      transitionName="am-zoom"
      closable={false}
      maskClosable={false}
      actionProps={{
        ...actionProps,
        actions,
      }}
      maskTransitionName="am-fade"
      wrapProps={{ onTouchStart: onWrapTouchStart }}
      style={style}
    >
      <div className={cls$('alert-content')}>{message}</div>
    </Modal>,
    div,
  );

  return {
    close,
  };
};

export default alert;
