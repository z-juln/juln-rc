/**
 * iframe: true
 * compact: true
 */
import { Anchor, AutoAnchorScroller } from 'juln-rc';
import React from 'react';
import styles from './index.module.less';

export default () => {
  const anchors = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({
    label: `label${i}`,
    value: `value${i}`,
  }));

  return (
    <div className={styles.basic1}>
      <AutoAnchorScroller
        anchors={anchors}
        opts={{
          activeDeviation: 0,
        }}
        height={200}
      >
        {{
          anchor({ actived, ...anchor }: Anchor) {
            return (
              <p style={{ color: actived ? 'red' : '' }}>{anchor.label}</p>
            );
          },
          slider(anchor, index) {
            return (
              <div>
                {/* eslint-disable-next-line react/destructuring-assignment */}
                <p>{anchor.label}</p>
                <div style={{ backgroundColor: 'green', height: '50px' }}>
                  {index + 1}
                </div>
                <br />
              </div>
            );
          },
        }}
      </AutoAnchorScroller>
    </div>
  );
};
