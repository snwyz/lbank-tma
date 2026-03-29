import type { WebApp, TelegramWindow } from '../types';

export function getWebApp(): WebApp | null {
  if (typeof window === 'undefined') return null;
  return (window as TelegramWindow).Telegram?.WebApp ?? null;
}
