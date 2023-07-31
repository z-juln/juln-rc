/**
 * iframe: true
 * transform: true
 */
import { Modal } from 'juln-rc';
import React from 'react';

const ColumnsBtns = () =>
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
        { text: 'btn1', onPress: () => alert('btn1') },
        { text: 'btn2', onPress: () => alert('btn2') },
        { text: 'btn3', onPress: () => alert('btn3') },
      ],
      direction: 'column',
    },
  });

ColumnsBtns();

export default () => <button onClick={ColumnsBtns}>Columns btns</button>;
