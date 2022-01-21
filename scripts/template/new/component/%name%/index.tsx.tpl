import React, { memo } from 'react';
import { getPrefixCls } from '@/utils';
import './index.less';

export const prefixCls = getPrefixCls('%name%');

export interface %name%Props {
  
}

export const %name%: React.FC<%name%Props> = ({
  
}) => {

  return (
    <>
      %name%
    </>
  );
};

export default memo(%name%);
