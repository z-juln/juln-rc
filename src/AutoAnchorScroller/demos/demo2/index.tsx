import React from 'react';
import { AutoAnchorScroller, Anchor } from 'juln-rc';
import styles from './index.module.less';

export default () => {
  const anchors = [
    { label: 'KDA', value: 'kda' },
    { label: '参团率', value: 'team_war_rate' },
    { label: '场均击杀', value: 'kills_per_game' },
    { label: '场均死亡', value: 'deaths_per_game' },
    { label: '场均助攻', value: 'assists_per_game' },
    { label: '输出/min', value: 'ddc_per_min' },
    { label: '输出占比', value: 'ddc_percentage' },
    { label: '承受伤害/min', value: 'damage_taken_per_min' },
    { label: '承受伤害占比', value: 'damage_taken_percentage' },
    { label: '经济/min', value: 'goldEarned_per_min' },
    { label: '单场最高击杀', value: 'max_kills' },
    { label: '单场最高死亡', value: 'max_deaths' },
    { label: '单场最高助攻', value: 'max_assists' },
    { label: '单场最高伤害', value: 'max_ddc' },
  ]

  return (
    <div className={styles.basic2}>
      <AutoAnchorScroller
        anchors={anchors}
        height="100vh"
      >
        {{
          anchor({ actived, ...anchor }: Anchor) {
            return <span style={{ color: actived ? 'red' : '' }}>{anchor.label}</span>
          },
          slider(anchor, index) {
            return (
              <div>
                {/* eslint-disable-next-line react/destructuring-assignment */}
                <p>{anchor.label}</p>
                <div style={{ backgroundColor: 'green', height: '50vh' }}>
                  {index + 1}
                </div>
                <br />
              </div>
            )
          },
        }}
      </AutoAnchorScroller>
    </div>
  );
};
