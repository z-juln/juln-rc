/**
 * iframe: true
 */
import { ModalHandler } from 'juln-rc';
import React, { useEffect, useState } from 'react';
import icon from './icon.svg';

const Modal = () => {
  useEffect(() => {
    return () => alert('Modal被销毁');
  }, []);
  return <div>content: this is content...</div>;
};

const DemoItem = ({ destroyOnClose }: { destroyOnClose?: boolean }) => {
  const [open, setOpen] = useState(false);

  const iconNode = <img src={icon} />;

  return (
    <>
      {destroyOnClose ? '' : '非'}destroyOnClose:
      <br />
      <br />
      <ModalHandler
        style={{ width: 20, height: 20 }}
        open={open}
        setOpen={setOpen}
        icon={iconNode}
        modal={{
          node: <Modal />,
          destroyOnClose,
          absoluteStyle: { top: 20, left: 20 },
        }}
      />
    </>
  );
};

export default () => (
  <>
    <DemoItem />
    <br />
    <DemoItem destroyOnClose />
  </>
);
