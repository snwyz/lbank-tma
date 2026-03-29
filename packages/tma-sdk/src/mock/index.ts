import type { TelegramWindow } from '../types';
import { MOCK_WEBAPP } from './webapp.mock';

export function injectMockIfNeeded(): void {
  if (typeof window === 'undefined') return;
  if (process.env.NODE_ENV !== 'development') return;

  const tgWindow = window as TelegramWindow;
  if (tgWindow.Telegram?.WebApp) return;

  if (!tgWindow.Telegram) {
    tgWindow.Telegram = {};
  }
  tgWindow.Telegram.WebApp = MOCK_WEBAPP;
  console.log('[TG Mock] Mock WebApp injected (dev mode)');
}

export { MOCK_WEBAPP } from './webapp.mock';
export { MOCK_USER } from './user.mock';
