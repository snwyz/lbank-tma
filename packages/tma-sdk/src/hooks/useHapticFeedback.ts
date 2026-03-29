'use client';
import type { HapticFeedback } from '../types';
import { useCallback } from 'react';
import { useWebApp } from './useWebApp';

const useHapticFeedback = () => {
  const webApp = useWebApp();
  const hapticFeedback = webApp?.HapticFeedback;

  const impactOccurred = useCallback(
    (...args: Parameters<HapticFeedback['impactOccurred']>) =>
      hapticFeedback?.impactOccurred(...args),
    [hapticFeedback],
  );

  const notificationOccurred = useCallback(
    (...args: Parameters<HapticFeedback['notificationOccurred']>) =>
      hapticFeedback?.notificationOccurred(...args),
    [hapticFeedback],
  );

  const selectionChanged = useCallback(
    () => hapticFeedback?.selectionChanged(),
    [hapticFeedback],
  );

  return [impactOccurred, notificationOccurred, selectionChanged] as const;
};

export default useHapticFeedback;
