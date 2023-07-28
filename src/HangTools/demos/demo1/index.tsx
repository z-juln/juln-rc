/**
 * iframe: true
 */
import { HangTools } from 'juln-rc';
import React from 'react';
import icon1 from './icon1.svg';
import icon2 from './icon2.svg';

const pageContent = (
  <img
    src="https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png"
    style={{ width: '100vw', height: '100vw' }}
    alt="pageContent"
  />
);

export default () => {
  const iconNode1 = <img src={icon1} onClick={() => alert('icon1')} />;
  const iconNode2 = <img src={icon2} onClick={() => alert('icon2')} />;
  return (
    <>
      {pageContent}

      <HangTools
        groups={[
          [iconNode1, iconNode2],
          [iconNode2, iconNode1, iconNode2],
        ]}
      />
    </>
  );
};
