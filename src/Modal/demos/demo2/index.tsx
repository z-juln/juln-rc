/**
 * iframe: true
 * transform: true
 */
import { Modal } from 'juln-rc';
import React from 'react';

const sleep = (timestamp: number) => new Promise((resolve) => setTimeout(resolve, timestamp));

const Confirm = () =>
  Modal.alert({
    // @ts-ignore
    title: <div onClick={close}>确认xxx吗</div>,
    message: 'this is message',
    actionProps: {
      actions: [
        { text: '取消', onPress: () => alert('取消') },
        {
          text: '3秒后确认',
          onPress: async () => {
            await sleep(3000);
            alert('确认');
          },
        },
      ],
    },
  });

Confirm();

export default () => <button onClick={Confirm}>Confirm</button>;
