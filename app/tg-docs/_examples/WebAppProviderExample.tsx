'use client';
import { WebAppProvider } from '@lbank/tma-sdk';

function InnerContent() {
  return (
    <div className='rounded bg-muted px-3 py-2 text-sm'>
      此区域由 <code>WebAppProvider</code> 包裹，内部的所有 Hook 均可正常访问
      Telegram WebApp 上下文。
    </div>
  );
}

export default function WebAppProviderExample() {
  return (
    <div className='space-y-3'>
      <p className='text-sm text-muted-foreground'>
        将 <code>WebAppProvider</code> 置于应用根节点，为子树中的所有组件和 Hook
        提供上下文。
      </p>
      <WebAppProvider>
        <InnerContent />
      </WebAppProvider>
    </div>
  );
}
