/**
 * iframe: true
 */
import { PageLoading } from 'juln-rc';
import React from 'react';

const doLoading = () => {
  const { close } = PageLoading.show();
  setTimeout(() => {
    close();
  }, 3000);
};

doLoading();

export default () => <button onClick={doLoading}>点击加载 (三秒后自动关闭)</button>;
