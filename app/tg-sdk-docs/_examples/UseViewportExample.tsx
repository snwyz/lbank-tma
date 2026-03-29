'use client';
import { useViewport } from '@lbank/tma-sdk';

export default function UseViewportExample() {
  const { height, stableHeight, isExpanded } = useViewport() ?? {
    height: 0,
    stableHeight: 0,
    isExpanded: false,
  };

  return (
    <div className='space-y-3'>
      <p className='text-sm text-muted-foreground'>
        实时视口信息（仅在 Telegram 环境中有值）：
      </p>
      <dl className='grid grid-cols-2 gap-x-6 gap-y-1 text-sm'>
        <dt className='text-muted-foreground'>height</dt>
        <dd className='font-mono'>{height}px</dd>
        <dt className='text-muted-foreground'>stableHeight</dt>
        <dd className='font-mono'>{stableHeight}px</dd>
        <dt className='text-muted-foreground'>isExpanded</dt>
        <dd className='font-mono'>{String(isExpanded)}</dd>
      </dl>
    </div>
  );
}
