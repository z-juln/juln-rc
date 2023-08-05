import getClsWithPrefix from '@/utils/cls';
import { render, unmount } from 'rc-util/lib/React/render';
import React from 'react';
import './index.less';

const subPrefix = 'PageLoading';
const cls$ = getClsWithPrefix(subPrefix);

interface PageLoadingComponent extends React.FC {
  show: typeof show;
}

const PageLoading: PageLoadingComponent = () => (
  <div className={cls$()}>
    <div className={cls$('icon')}>icon</div>
    <span className={cls$('text')}>加载中...</span>
  </div>
);

const show = () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const close = () => {
    unmount(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  };

  // 兼容react18的waring
  render(<PageLoading />, div);

  return {
    close,
  };
};

PageLoading.show = show;

export default PageLoading;
