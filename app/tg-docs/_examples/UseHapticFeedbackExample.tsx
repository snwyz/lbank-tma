'use client';
import { useHapticFeedback } from '@lbank/tma-sdk';

export default function UseHapticFeedbackExample() {
  const [impactOccurred, notificationOccurred, selectionChanged] =
    useHapticFeedback();

  return (
    <div className='space-y-3'>
      <p className='text-sm text-muted-foreground'>
        点击按钮触发对应触觉反馈（仅在 Telegram 客户端内有效）。
      </p>
      <div className='flex flex-wrap gap-2'>
        <button
          className='rounded border px-3 py-1.5 text-sm'
          onClick={() => impactOccurred('light')}
        >
          轻冲击
        </button>
        <button
          className='rounded border px-3 py-1.5 text-sm'
          onClick={() => impactOccurred('medium')}
        >
          中冲击
        </button>
        <button
          className='rounded border px-3 py-1.5 text-sm'
          onClick={() => impactOccurred('heavy')}
        >
          重冲击
        </button>
        <button
          className='rounded border px-3 py-1.5 text-sm'
          onClick={() => notificationOccurred('success')}
        >
          通知-成功
        </button>
        <button
          className='rounded border px-3 py-1.5 text-sm'
          onClick={() => notificationOccurred('warning')}
        >
          通知-警告
        </button>
        <button
          className='rounded border px-3 py-1.5 text-sm'
          onClick={() => notificationOccurred('error')}
        >
          通知-错误
        </button>
        <button
          className='rounded border px-3 py-1.5 text-sm'
          onClick={() => selectionChanged()}
        >
          选择变化
        </button>
      </div>
    </div>
  );
}
