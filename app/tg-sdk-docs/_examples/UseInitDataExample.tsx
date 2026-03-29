'use client';
import { useInitData } from '@lbank/tma-sdk';

export default function UseInitDataExample() {
  const { initDataUnsafe } = useInitData() ?? {};
  const user = initDataUnsafe?.user;

  return (
    <div className='space-y-3'>
      <p className='text-sm text-muted-foreground'>
        从 Telegram 传递的 initData 中解析出的用户信息：
      </p>
      {!user ? (
        <p className='text-sm text-yellow-600'>
          未在 Telegram 环境中，无法获取 initData。
        </p>
      ) : (
        <dl className='grid grid-cols-2 gap-x-6 gap-y-1 text-sm'>
          <dt className='text-muted-foreground'>id</dt>
          <dd className='font-mono'>{user.id}</dd>
          <dt className='text-muted-foreground'>first_name</dt>
          <dd>{user.first_name}</dd>
          {user.last_name && (
            <>
              <dt className='text-muted-foreground'>last_name</dt>
              <dd>{user.last_name}</dd>
            </>
          )}
          {user.username && (
            <>
              <dt className='text-muted-foreground'>username</dt>
              <dd className='font-mono'>@{user.username}</dd>
            </>
          )}
          <dt className='text-muted-foreground'>language_code</dt>
          <dd>{user.language_code ?? '—'}</dd>
        </dl>
      )}
    </div>
  );
}
