import { useCallback, useEffect, useState } from 'react';
import { useWebApp } from './useWebApp';

interface AccelerometerData { x: number; y: number; z: number; }

const useAccelerometer = () => {
  const webApp = useWebApp();
  const [data, setData] = useState<AccelerometerData | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  const startTracking = useCallback((refreshRate?: number) => {
    const acc = webApp?.Accelerometer;
    if (!acc) return false;
    try { acc.start({ refresh_rate: refreshRate }); setIsTracking(true); return true; }
    catch (e) { console.error('Failed to start accelerometer:', e); return false; }
  }, [webApp]);

  const stopTracking = useCallback(() => {
    const acc = webApp?.Accelerometer;
    if (!acc) return;
    acc.stop(); setIsTracking(false); setData(null);
  }, [webApp]);

  useEffect(() => {
    const acc = webApp?.Accelerometer;
    if (!acc) return;
    const handler = () => setData({ x: acc.x || 0, y: acc.y || 0, z: acc.z || 0 });
    webApp?.onEvent('accelerometerChanged', handler);
    return () => { webApp?.offEvent('accelerometerChanged', handler); stopTracking(); };
  }, [webApp, stopTracking]);

  return { data, isTracking, startTracking, stopTracking, isAvailable: !!webApp?.Accelerometer };
};
export default useAccelerometer;
