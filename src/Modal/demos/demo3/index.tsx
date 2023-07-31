/**
 * iframe: true
 * transform: true
 */
import { Modal } from 'juln-rc';
import React from 'react';

const ConfirmOnlyBtn = () =>
  Modal.alert({
    title: 'xxx',
    message: 'this is message',
    actionProps: {
      actions: [{ text: '知道了', onPress: () => alert('知道了') }],
    },
  });

ConfirmOnlyBtn();

export default () => <button onClick={ConfirmOnlyBtn}>ConfirmOnlyBtn</button>;
