/**
 * iframe: true
 * transform: true
 */
import { Modal } from 'juln-rc';
import React from 'react';

const Alert = () => {
  const { close } = Modal.alert({
    title: '确认xxx吗',
    message: '3秒后自动关闭',
  });

  setTimeout(() => {
    close();
  }, 3000);
};

export default () => <button onClick={Alert}>Alert</button>;
