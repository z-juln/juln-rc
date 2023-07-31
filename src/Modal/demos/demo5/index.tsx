/**
 * iframe: true
 * transform: true
 */
import { Modal } from 'juln-rc';
import React from 'react';

const ConfirmCustomTitle = () =>
  Modal.alert({
    title: (
      <>
        this is
        <br />
        title
      </>
    ),
    message: '',
    actionProps: {
      actions: [
        { text: '取消', onPress: () => alert('取消') },
        { text: '确认', onPress: () => alert('确认') },
      ],
    },
  });

ConfirmCustomTitle();

export default () => <button onClick={ConfirmCustomTitle}>Confirm custom title</button>;
