'use client';

import {
  useInitData,
  useStartParam,
  useOpenLink,
  buildReferralLink,
} from '@lbank/tma-sdk';
import type { StartAppPayload } from '@lbank/tma-sdk';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

// Bot / App 标识符，实际值通过环境变量注入
const BOT_NAME = process.env.NEXT_PUBLIC_TG_BOT_NAME ?? 'lbkTgBot';
const APP_NAME = process.env.NEXT_PUBLIC_TG_APP_NAME ?? 'lbank';

// Mock 邀请统计（无后端，前端 MVP 固定数据）
const MOCK_STATS = { inviteCount: 3, totalPoints: 30 };

export default function Page() {
  const { initData, initDataUnsafe } = useInitData();
  const payload = useStartParam<StartAppPayload>();
  const { openTelegramLink } = useOpenLink();
  const router = useRouter();
  const user = initDataUnsafe?.user;
  const currentUserId = String(user?.id ?? '');
  const displayName =
    [user?.first_name, user?.last_name].filter(Boolean).join(' ') ||
    user?.username ||
    '未知用户';

  const referralLink = currentUserId
    ? buildReferralLink({
        botName: BOT_NAME,
        appName: APP_NAME,
        ref: currentUserId,
      })
    : null;

  console.log('initData:', initData);
  console.log('startParam payload:', payload);
  console.log('referralLink:', referralLink);

  const isInvited = Boolean(payload?.ref);

  function handleShare() {
    if (!referralLink) return;
    openTelegramLink(referralLink);
  }

  return (
    <main className='min-h-screen p-4 flex flex-col gap-4 bg-background'>
      {/* 顶部：用户信息 */}
      <Card>
        <CardHeader className='pb-2'>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-base'>
              我的账户 {!initData && '（Mock 数据）'}
            </CardTitle>
            {isInvited && <Badge variant='secondary'>受邀用户</Badge>}
          </div>
        </CardHeader>
        <CardContent className='flex flex-col gap-1 text-sm'>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>用户名</span>
            <span className='font-medium'>{displayName}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Telegram ID</span>
            <span className='font-mono text-xs'>{currentUserId || '—'}</span>
          </div>
        </CardContent>
      </Card>

      {/* 归因信息：被邀请人模式 */}
      {isInvited && (
        <Card className='border-primary/30 bg-primary/5'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-base'>邀请归因</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-1 text-sm'>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>邀请人 TG ID</span>
              <span className='font-mono text-xs'>{payload?.ref}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>来源渠道</span>
              <span>{payload?.ch ?? 'share'}</span>
            </div>
            <p className='text-xs text-muted-foreground mt-1'>
              你通过好友邀请链接加入，归因已记录 ✓
            </p>
          </CardContent>
        </Card>
      )}

      {/* 邀请人模式：自己的邀请统计 */}
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-base'>我的邀请</CardTitle>
        </CardHeader>
        <CardContent className='flex gap-8'>
          <div className='flex flex-col items-center'>
            <span className='text-2xl font-bold'>{MOCK_STATS.inviteCount}</span>
            <span className='text-xs text-muted-foreground'>成功邀请</span>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-2xl font-bold'>{MOCK_STATS.totalPoints}</span>
            <span className='text-xs text-muted-foreground'>获得积分</span>
          </div>
        </CardContent>
      </Card>

      {/* 推广链接 */}
      {referralLink && (
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-base'>我的推广链接</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-3'>
            <p className='text-xs text-muted-foreground break-all font-mono'>
              {referralLink}
            </p>
            <Button className='w-full' onClick={handleShare}>
              邀请朋友获积分
            </Button>
          </CardContent>
        </Card>
      )}

      {/* initData 调试信息 */}
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-base text-muted-foreground'>
            initData（调试）
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className='text-xs text-muted-foreground break-all whitespace-pre-wrap'>
            {initData || '（无 initData，可能在非 TG 环境中运行）'}
          </pre>
        </CardContent>
      </Card>

      {/* 跳转tg sdk 文档 */}
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle
            onClick={() => router.push('/tg-sdk-docs')}
            className='text-base text-muted-foreground'
          >
            跳转 TG SDK 文档
          </CardTitle>
        </CardHeader>
      </Card>
    </main>
  );
}
