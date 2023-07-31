import getClsWithPrefix from '@/utils/cls';
import classNames from 'classnames';
import React from 'react';
import Dialog from 'rmc-dialog';
import alert from './alert';
import './index.less';
import { Action, ModalPropsType } from './interface';

const subPrefix = 'Modal';
export const cls$ = getClsWithPrefix(subPrefix);

export interface ModalProps extends ModalPropsType {
  transitionName?: string;
  maskTransitionName?: string;
  className?: string;
  wrapClassName?: string;
  wrapProps?: Partial<React.HTMLProps<HTMLDivElement>>;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

interface ModalComponent extends React.FC<ModalProps> {
  alert: typeof alert;
}

const Modal: ModalComponent = ({
  className,
  style,
  wrapClassName,
  actionProps,
  operation = false,
  transparent = false,
  maskTransitionName,
  popup = false,
  animationType = 'slide-down',
  animated = true,
  transitionName,
  ...restProps
}) => {
  const { actions = [], direction: actionsDirection = 'row' } = actionProps ?? {};

  const renderFooterButton = (action: Action) => {
    return (
      <button
        className={cls$('button')}
        role="button"
        onClick={(e) => {
          e.preventDefault();
          if (action.onPress) {
            action.onPress();
          }
        }}
        style={action.style ?? {}}
      >
        {action.text}
      </button>
    );
  };

  const footerDom = actions.length ? (
    <div
      className={cls$(
        `button-group-${actions.length === 2 && !operation ? 'h' : 'v'}`,
        `button-group-${operation ? 'operation' : 'normal'}`,
        `button-direction-${actionsDirection}`,
      )}
      role="group"
    >
      {actions.map((button) => renderFooterButton(button))}
    </div>
  ) : null;

  let transName;
  let maskTransName;
  if (animated) {
    // tslint:disable-next-line:prefer-conditional-expression
    if (transparent) {
      transName = maskTransName = 'am-fade';
    } else {
      transName = maskTransName = 'am-slide-up';
    }
    if (popup) {
      transName = animationType === 'slide-up' ? 'am-slide-up' : 'am-slide-down';
      maskTransName = 'am-fade';
    }
  }

  return (
    <Dialog
      {...restProps}
      prefixCls={cls$()}
      className={classNames(
        className,
        cls$({
          transparent,
          popup,
          [`popup-${animationType}`]: popup && animationType,
        }),
      )}
      wrapClassName={classNames(wrapClassName, {
        [cls$('wrap-popup')]: popup,
      })}
      transitionName={transitionName || transName}
      maskTransitionName={maskTransitionName || maskTransName}
      style={style}
      footer={footerDom}
    />
  );
};

Modal.alert = alert;

export default Modal;
