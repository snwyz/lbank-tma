'use client';
import { useState } from 'react';
import { MainButton } from '@lbank/tma-sdk';

export default function MainButtonExample() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const handleClick = () => {
    setLoading(true);
    setLog((prev) => [
      ...prev,
      `MainButton clicked at ${new Date().toLocaleTimeString()}`,
    ]);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className='space-y-3'>
      <p className='text-sm text-muted-foreground'>
        MainButton 渲染在 Telegram 客户端底部的主按钮位置。
      </p>
      <div className='flex gap-2'>
        <button
          className='rounded border px-3 py-1.5 text-sm'
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? '隐藏 MainButton' : '显示 MainButton'}
        </button>
      </div>
      {visible && (
        <MainButton
          text={loading ? '加载中…' : '确认提交'}
          color='#3390EC'
          textColor='#ffffff'
          isProgressVisible={loading}
          onClick={handleClick}
        />
      )}
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
