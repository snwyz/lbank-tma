'use client';
import { useState } from 'react';
import { SecondaryButton } from '@lbank/tma-sdk';

export default function SecondaryButtonExample() {
  const [visible, setVisible] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const handleClick = () => {
    setLog((prev) => [
      ...prev,
      `SecondaryButton clicked at ${new Date().toLocaleTimeString()}`,
    ]);
  };

  return (
    <div className='space-y-3'>
      <p className='text-sm text-muted-foreground'>
        SecondaryButton 出现在 Telegram 客户端底部，部分版本 TG 客户端支持。
      </p>
      <div className='flex gap-2'>
        <button
          className='rounded border px-3 py-1.5 text-sm'
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? '隐藏 SecondaryButton' : '显示 SecondaryButton'}
        </button>
      </div>
      {visible && <SecondaryButton text='取消' onClick={handleClick} />}
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
