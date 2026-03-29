'use client';
import { useThemeParams } from '@lbank/tma-sdk';

export default function UseThemeParamsExample() {
  const themeParams = useThemeParams();

  const colors = themeParams
    ? (Object.entries(themeParams) as [string, string | undefined][]).filter(
        ([, v]) => v,
      )
    : [];

  return (
    <div className='space-y-3'>
      <p className='text-sm text-muted-foreground'>
        以下是从 Telegram 客户端读取到的当前主题色参数：
      </p>
      {colors.length === 0 ? (
        <p className='text-sm text-yellow-600'>
          未在 Telegram 环境中，无法读取主题参数。
        </p>
      ) : (
        <dl className='grid grid-cols-2 gap-x-4 gap-y-1 text-sm'>
          {colors.map(([key, value]) => (
            <div key={key} className='flex items-center gap-2'>
              <div
                className='h-4 w-4 shrink-0 rounded-sm border'
                style={{ backgroundColor: value }}
              />
              <dt className='font-mono text-xs text-muted-foreground'>{key}</dt>
              <dd className='font-mono text-xs'>{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
