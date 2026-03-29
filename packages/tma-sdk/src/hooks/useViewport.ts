'use client';
import { useEffect, useState } from 'react';
import { useWebApp } from './useWebApp';

const useViewport = () => {
  const webApp = useWebApp();
  const [viewport, setViewport] = useState({
    height: webApp?.viewportHeight ?? 0,
    stableHeight: webApp?.viewportStableHeight ?? 0,
    isExpanded: webApp?.isExpanded ?? false,
  });

  useEffect(() => {
    if (!webApp) return;
    const handler = () =>
      setViewport({
        height: webApp.viewportHeight ?? 0,
        stableHeight: webApp.viewportStableHeight ?? 0,
        isExpanded: webApp.isExpanded ?? false,
      });
    webApp.onEvent('viewportChanged', handler);
    handler();
    return () => webApp.offEvent('viewportChanged', handler);
  }, [webApp]);

  return viewport;
};
export default useViewport;
