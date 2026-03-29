import type { WebApp, EventType, EventCallback } from '../types';
import { useEffect } from 'react';
import { useWebApp } from './useWebApp';

const useOnEvent = (event: EventType, cb: EventCallback): void => {
  const webApp = useWebApp();

  useEffect(() => {
    webApp?.onEvent(event, cb);
    return () => {
      webApp?.offEvent(event, cb);
    };
  }, [webApp, event, cb]);
};

export default useOnEvent;
