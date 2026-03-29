'use client';
import type { WebApp, PopupParams } from '../types';
import { useCallback } from 'react';
import { useWebApp } from './useWebApp';

const useShowPopup = () => {
  const webApp = useWebApp();

  return useCallback(
    (params: PopupParams) =>
      new Promise((resolve, reject) => {
        try {
          webApp?.showPopup(params, resolve);
        } catch (e) {
          reject(e);
        }
      }),
    [webApp],
  );
};

export default useShowPopup;
