'use client';
import { useState } from 'react';
import { BackButton } from '@lbank/tma-sdk';

export default function BackButtonExample() {
  const [visible, setVisible] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const handleClick = () => {
    setLog((prev) => [
      ...prev,
      `BackButton clicked at ${new Date().toLocaleTimeString()}`,
    ]);
  };

  return (
    <div className='space-y-3'>
      <p className='text-sm text-muted-foreground'>
        挂载后 BackButton 会出现在 Telegram 客户端顶部的返回箭头位置。
      </p>
      <div className='flex gap-2'>
        <button
          className='rounded border px-3 py-1.5 text-sm'
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? '隐藏 BackButton' : '显示 BackButton'}
        </button>
      </div>
      {visible && <BackButton onClick={handleClick} />}
      {log.length > 0 && (
        <ul className='rounded bg-muted px-3 py-2 text-xs'>
          {log.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
