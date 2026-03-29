import { getWebApp } from '../core/init';

export type TelegramPlatform = 'ios' | 'android' | 'web' | 'unknown';

export function getTelegramPlatform(): TelegramPlatform {
  const platform = getWebApp()?.platform ?? '';
  if (platform === 'ios' || platform === 'ipad' || platform === 'iphone') return 'ios';
  if (platform === 'android' || platform === 'android_x') return 'android';
  if (platform === 'web' || platform === 'tdesktop' || platform === 'webk' || platform === 'webz') return 'web';
  return 'unknown';
}
