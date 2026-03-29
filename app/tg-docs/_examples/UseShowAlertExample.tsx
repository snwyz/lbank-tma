'use client';
import { useShowAlert } from '@lbank/tma-sdk';
import { useState } from 'react';

export default function UseShowAlertExample() {
  const showAlert = useShowAlert();
  const [status, setStatus] = useState('');

  const handleAlert = async () => {
    setStatus('等待用户关闭弹窗…');
    await showAlert('这是一条来自 TMA SDK 的 Alert 弹窗！');
    setStatus('用户已关闭弹窗');
  };

  return (
    <div className='space-y-3'>
      <p className='text-sm text-muted-foreground'>
        点击按钮调用 Telegram 原生 Alert，弹窗关闭后 Promise resolve。
      </p>
      <button
        className='rounded border px-3 py-1.5 text-sm'
        onClick={handleAlert}
      >
        弹出 Alert
      </button>
      {status && <p className='text-sm text-muted-foreground'>{status}</p>}
    </div>
  );
}
