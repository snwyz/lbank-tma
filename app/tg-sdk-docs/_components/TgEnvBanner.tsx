'use client';

import { useEffect, useState } from 'react';

export default function TgEnvBanner() {
  const [isTg, setIsTg] = useState<boolean | null>(null);

  useEffect(() => {
    setIsTg(
      typeof window !== 'undefined' &&
        !!(window as Window & { Telegram?: { WebApp?: unknown } }).Telegram
          ?.WebApp,
    );
  }, []);

  if (isTg === null) return null;
  if (isTg) return null;

  return (
    <div className='mb-4 flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800 dark:border-yellow-800/50 dark:bg-yellow-900/20 dark:text-yellow-300'>
      <span className='mt-0.5 text-base'>⚠️</span>
      <span>
        需要在 Telegram 客户端中打开才能体验此功能。代码示例仍可正常查阅。
      </span>
    </div>
  );
}
