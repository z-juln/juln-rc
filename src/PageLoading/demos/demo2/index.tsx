/**
 * iframe: true
 */
import { PageLoading } from 'juln-rc';
import React, { useState } from 'react';

export default () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <button onClick={() => setLoading(true)}>加载</button>
      <button onClick={() => setLoading(false)}>关闭加载</button>

      {loading && <PageLoading />}
    </>
  );
};
