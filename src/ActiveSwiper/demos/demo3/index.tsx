import React, { useState } from 'react';
import { ActiveSwiper } from 'juln-rc';
import style from './index.less';

export default () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const options = [
    'tab1',
    'tab2',
    'tab3'
  ];

  return (
    <div className={style.Demo3}>
      
      <ActiveSwiper
        onChangeActiveIndex={setActiveIndex}
        slidesPerView={2}
        deviation={-1}
      >
        {activeIndex =>
          options.map((option, index) => (
            <p key={index} style={{textAlign: 'center'}}>{option}</p>
          ))
        }
      </ActiveSwiper>

      <hr />
      <p>activeIndex: {activeIndex}</p>
    </div>
  );
};
