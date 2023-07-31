/**
 * iframe: true
 * transform: true
 */
import { Modal } from 'juln-rc';
import React from 'react';

const ConfirmOnlyTitle = () =>
  Modal.alert({
    title: '确认xxx吗',
    message: '',
    actionProps: {
      actions: [
        { text: '取消', onPress: () => alert('取消') },
        { text: '确认', onPress: () => alert('确认') },
      ],
    },
  });

ConfirmOnlyTitle();

export default () => <button onClick={ConfirmOnlyTitle}>Confirm only title</button>;
