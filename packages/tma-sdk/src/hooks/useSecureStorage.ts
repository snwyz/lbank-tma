'use client';
import { useCallback } from 'react';
import { useWebApp } from './useWebApp';

const useSecureStorage = () => {
  const webApp = useWebApp();
  const ss = webApp?.SecureStorage;

  const setItem = useCallback(
    (key: string, value: string) =>
      new Promise<void>((resolve, reject) => {
        if (!ss) { reject(new Error('SecureStorage not available')); return; }
        ss.setItem(key, value, (error, success) => {
          if (error) reject(new Error(error));
          else if (success) resolve();
          else reject(new Error('Failed to set item'));
        });
      }),
    [ss],
  );

  const getItem = useCallback(
    (key: string) =>
      new Promise<string | null>((resolve, reject) => {
        if (!ss) { reject(new Error('SecureStorage not available')); return; }
        ss.getItem(key, (error, value) => {
          if (error) reject(new Error(error));
          else resolve(value ?? null);
        });
      }),
    [ss],
  );

  const removeItem = useCallback(
    (key: string) =>
      new Promise<void>((resolve, reject) => {
        if (!ss) { reject(new Error('SecureStorage not available')); return; }
        ss.removeItem(key, (error, success) => {
          if (error) reject(new Error(error));
          else if (success) resolve();
          else reject(new Error('Failed to remove item'));
        });
      }),
    [ss],
  );

  return { setItem, getItem, removeItem, isAvailable: !!ss };
};
export default useSecureStorage;
