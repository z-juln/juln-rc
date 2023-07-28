import getClsWithPrefix from '@/utils/cls';
import React, { useEffect, useState } from 'react';
import './index.less';

const subPrefix = 'ModalHandler';
const cls$ = getClsWithPrefix(subPrefix);

interface Modal {
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  node: React.ReactNode;
  absoluteStyle?: Pick<
    React.CSSProperties,
    'top' | 'left' | 'right' | 'bottom'
  >;
}

export interface HandlerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  openMode?: 'hover' | 'click';
  icon: React.ReactNode;
  modal: Modal;
}

const Handler: React.FC<HandlerProps> = ({
  className = '',
  open = false,
  onClick,
  setOpen,
  openMode = 'click',
  icon,
  modal: {
    maskClosable = false,
    destroyOnClose = false,
    node: modalNode,
    absoluteStyle = { bottom: 0, right: 0 },
  },
  ...restProps
}) => {
  const [hanlderWrapperEl, setHandlerWrapperEl] =
    useState<HTMLDivElement | null>(null);

  // maskClosable
  useEffect(() => {
    if (openMode !== 'click') return;
    if (!maskClosable) return;
    if (!hanlderWrapperEl) return;

    const onDocumentClick = ({ target }: MouseEvent) => {
      if (target !== null && !hanlderWrapperEl.contains(target as any)) {
        setOpen?.(false);
      }
    };
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, [maskClosable, openMode, hanlderWrapperEl]);

  // hover
  useEffect(() => {
    if (openMode !== 'hover') return;
    if (!hanlderWrapperEl) return;

    const onMouseEnter = () => setOpen?.(true);
    const onMouseLeave = () => setOpen?.(false);
    hanlderWrapperEl.addEventListener('mouseenter', onMouseEnter);
    hanlderWrapperEl.addEventListener('mouseleave', onMouseLeave);
    return () => {
      hanlderWrapperEl?.removeEventListener('mouseenter', onMouseEnter);
      hanlderWrapperEl?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [openMode, hanlderWrapperEl]);

  const modalWrapper = destroyOnClose ? (
    <div className={cls$('modal')} style={absoluteStyle}>
      {open ? modalNode : null}
    </div>
  ) : (
    <div
      className={cls$('modal')}
      style={{ display: open ? 'block' : 'none', ...absoluteStyle }}
    >
      {modalNode}
    </div>
  );

  return (
    <div className={cls$('wrapper')} ref={setHandlerWrapperEl}>
      <div
        className={`${cls$()} ${className}`}
        onClick={() => openMode === 'click' && setOpen?.((open) => !open)}
        {...restProps}
      >
        {icon}
      </div>

      {modalWrapper}
    </div>
  );
};

export default Handler;
