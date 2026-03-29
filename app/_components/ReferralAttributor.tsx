'use client';

import { useEffect } from 'react';
import { useInitData, useStartParam } from '@lbank/tma-sdk';
import type { StartAppPayload } from '@lbank/tma-sdk';

/**
 * 在 Mini App 首次加载时检测 startapp 参数，若含 ref 字段则打印归因信息。
 * MVP 阶段无后端接入，仅作调试用途。
 */
export function ReferralAttributor() {
  const { initData } = useInitData();
  const payload = useStartParam<StartAppPayload>();

  useEffect(() => {
    if (!payload?.ref) return;
    // TODO: 后端接入后在此处调用 attributeReferral(payload.ref, initData)
    console.debug('[ReferralAttributor] 检测到邀请参数', {
      ref: payload.ref,
      ch: payload.ch,
      initData,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
