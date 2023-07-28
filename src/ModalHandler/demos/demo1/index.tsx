/**
 * iframe: true
 */
import { ModalHandler } from 'juln-rc';
import React, { useState } from 'react';
import icon from './icon.svg';

export default () => {
  const [open, setOpen] = useState(true);

  const modal = (
    <div>
      content: this is content xxx...
      <br />
      <br />
      <button onClick={() => setOpen(false)}>close</button>
    </div>
  );

  const iconNode = <img src={icon} />;

  return (
    <>
      <ModalHandler
        style={{ width: 20, height: 20 }}
        open={open}
        setOpen={setOpen}
        icon={iconNode}
        modal={{ node: modal, absoluteStyle: { top: 20, left: 20 } }}
      />
    </>
  );
};
