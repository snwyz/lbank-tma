'use client';

import React, { useEffect, useState } from 'react';
import type { WebApp } from '../types';
import { webAppContext } from '../context';
import { getWebApp } from '../core/init';

const WebAppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [twa, setTwa] = useState<WebApp | null>(null);

  useEffect(() => {
    const init = async () => {
      // dev 环境自动注入 Mock（若真实 TG WebApp 不存在）
      if (process.env.NODE_ENV === 'development') {
        const { injectMockIfNeeded } = await import('../mock');
        injectMockIfNeeded();
      }
      setTwa(getWebApp());
    };
    init();
  }, []);

  return (
    <webAppContext.Provider value={twa}>{children}</webAppContext.Provider>
  );
};

export default WebAppProvider;
