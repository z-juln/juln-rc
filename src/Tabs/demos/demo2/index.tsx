import { Tabs } from 'juln-rc';
import React, { useState } from 'react';

export default () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const options = ['tab1', 'tab2', 'tab3'];

  return (
    <div style={{ width: 150 }}>
      <Tabs onChangeActiveIndex={setActiveIndex} slidesPerView={2}>
        {(activeIndex) =>
          options.map((option, index) => (
            <p key={index} style={{ textAlign: 'center' }}>
              {option}
            </p>
          ))
        }
      </Tabs>

      <hr />
      <p>activeIndex: {activeIndex}</p>
    </div>
  );
};
