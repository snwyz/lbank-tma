'use client';
import { useCallback } from 'react';
import { useWebApp } from './useWebApp';

interface ShareToStoryParams {
  mediaUrl: string;
  text?: string;
  widgetLink?: { url: string; name?: string };
}

const useShareToStory = () => {
  const webApp = useWebApp();

  const shareToStory = useCallback(
    (params: ShareToStoryParams) =>
      new Promise<void>((resolve, reject) => {
        if (!webApp?.shareToStory) { reject(new Error('shareToStory not available')); return; }
        try {
          webApp.shareToStory(params.mediaUrl, { text: params.text, widget_link: params.widgetLink });
          resolve();
        } catch (e) {
          reject(e);
        }
      }),
    [webApp],
  );

  return { shareToStory, isAvailable: !!webApp?.shareToStory };
};
export default useShareToStory;
