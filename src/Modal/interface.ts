import * as React from 'react';
export interface ModalPropsType {
  title?: React.ReactNode;
  visible: boolean;
  maskClosable?: boolean;
  closable?: boolean;
  actionProps?: {
    actions?: Action[];
    direction?: 'row' | 'column';
  };
  onClose?: () => void;
  transparent?: boolean;
  popup?: boolean;
  animated?: boolean;
  animationType?: any;
  onAnimationEnd?: (visible: boolean) => void;
  animateAppear?: boolean;
  operation?: boolean;
}

export interface Action {
  text: React.ReactNode;
  onPress?: () => void | Promise<void>;
  closeModal?: () => void;
  style?: React.CSSProperties;
}
