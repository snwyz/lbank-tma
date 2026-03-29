'use client';
import { useWebApp } from './useWebApp';
import { decodeStartParam } from '../utils/referral';
import type { StartAppPayload } from '../types/referral.types';

/**
 * 读取当前 Mini App 的 startapp 参数并解码为 JSON 对象。
 * 若无 startapp 参数或解码失败，返回 null。
 */
function useStartParam<T = StartAppPayload>(): T | null {
  const webApp = useWebApp();
  const raw = webApp?.initDataUnsafe?.start_param;
  if (!raw) return null;
  return decodeStartParam<T>(raw);
}

export default useStartParam;
