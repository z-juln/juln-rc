import getClsWithPrefix from '@/utils/cls';
import { reactNodeArray_join } from 'juln-hooks';
import React from 'react';
import './index.less';

const subPrefix = 'HangTools';
const cls$ = getClsWithPrefix(subPrefix);

export interface HangToolsProps {
  className?: string;
  groups: React.ReactNode[][];
}

const HangTools: React.FC<HangToolsProps> = ({ className = '', groups }) => {
  return (
    <div className={`${cls$()} ${className}`}>
      {groups.map((tools) => (
        <div className={cls$('group')}>
          {reactNodeArray_join(
            tools.map((tool) => (
              <div className={cls$('tool-container')}>{tool}</div>
            )),
            <div className={cls$('line')}></div>,
          )}
        </div>
      ))}
    </div>
  );
};

export default HangTools;
