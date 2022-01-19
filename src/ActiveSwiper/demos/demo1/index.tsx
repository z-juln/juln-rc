import React, { useState } from 'react';
import { ActiveSwiper } from 'juln-rc';

export default () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const options = [
    'tab1',
    'tab2'
  ];

  return (
    <div>
      
      <ActiveSwiper
        onChangeActiveIndex={setActiveIndex}
        slidesPerView={2}
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
