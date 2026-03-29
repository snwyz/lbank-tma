'use client';
import { useSwitchInlineQuery } from '@lbank/tma-sdk';
import { useState } from 'react';

const MOCK_INVITE_CODE = 'ref_123456';

export default function UseSwitchInlineQueryExample() {
  const switchInlineQuery = useSwitchInlineQuery();
  const [triggered, setTriggered] = useState(false);

  const inviteQuery = `join ${MOCK_INVITE_CODE}`;

  function handleInvite() {
    switchInlineQuery(inviteQuery, ['users', 'groups']);
    setTriggered(true);
    setTimeout(() => setTriggered(false), 2000);
  }

  return (
    <div className='space-y-4'>
      <p className='text-sm text-muted-foreground'>
        点击按钮后，Telegram 会切换到 Inline
        模式并预填充邀请查询词，用户可选择联系人或群组分享邀请卡片。
      </p>
      <p className='text-xs text-muted-foreground bg-muted/50 rounded px-3 py-2'>
        ⚠️ 前置条件：需在 BotFather 中为 Bot 开启 Inline Mode。
      </p>

      {/* Mock 邀请卡片预览 */}
      <div className='rounded-lg border bg-card p-3 space-y-2'>
        <div className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>
          Inline 结果预览（Mock）
        </div>
        <div className='flex gap-3 items-start'>
          <div className='w-12 h-12 rounded bg-primary/20 flex items-center justify-center text-xl shrink-0'>
            🎁
          </div>
          <div className='flex flex-col gap-0.5'>
            <span className='text-sm font-semibold'>
              加入 LBank，赚取积分！
            </span>
            <span className='text-xs text-muted-foreground'>
              使用我的邀请码{' '}
              <code className='font-mono'>{MOCK_INVITE_CODE}</code>{' '}
              注册，双方均可获得积分奖励。
            </span>
          </div>
        </div>
      </div>

      <button
        className='rounded border px-3 py-1.5 text-sm w-full'
        onClick={handleInvite}
      >
        {triggered ? '已触发 Inline Query ✓' : '邀请好友（switchInlineQuery）'}
      </button>

      <div className='text-xs text-muted-foreground bg-muted/30 rounded px-3 py-2 font-mono'>
        switchInlineQuery(&quot;{inviteQuery}&quot;, [&apos;users&apos;,
        &apos;groups&apos;])
      </div>
    </div>
  );
}
