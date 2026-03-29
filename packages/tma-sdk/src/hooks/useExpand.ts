'use client';
import { useCallback, useEffect, useState } from 'react';
import { useWebApp } from './useWebApp';

const useExpand = () => {
  const webApp = useWebApp();
  const [isExpanded, setIsExpanded] = useState(webApp?.isExpanded);

  useEffect(() => {
    if (!webApp) return;
    const handler = (payload: { isStateStable: boolean }) => {
      if (payload.isStateStable) setIsExpanded(webApp.isExpanded);
    };
    webApp.onEvent('viewportChanged', handler);
    return () => webApp.offEvent('viewportChanged', handler);
  }, [webApp]);

  const handleExpand = useCallback(() => webApp?.expand?.(), [webApp]);
  return [isExpanded, handleExpand] as const;
};
export default useExpand;
