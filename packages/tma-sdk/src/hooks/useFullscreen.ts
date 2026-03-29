import { useCallback, useEffect, useState } from 'react';
import { useWebApp } from './useWebApp';

const useFullscreen = () => {
  const webApp = useWebApp();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const requestFullscreen = useCallback(() => webApp?.requestFullscreen?.(), [webApp]);
  const exitFullscreen = useCallback(() => webApp?.exitFullscreen?.(), [webApp]);

  useEffect(() => {
    if (!webApp) return;
    const handler = () => setIsFullscreen(webApp.isFullscreen);
    webApp.onEvent('fullscreenChanged', handler);
    return () => webApp.offEvent('fullscreenChanged', handler);
  }, [webApp]);

  return { isFullscreen, requestFullscreen, exitFullscreen };
};
export default useFullscreen;
