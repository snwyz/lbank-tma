import type {
  StartAppPayload,
  ReferralLinkOptions,
} from '../types/referral.types';

const MAX_STARTAPP_BYTES = 512;

/**
 * 将 StartAppPayload 编码为 URL-safe Base64 字符串（无 padding）。
 * 超过 512 字节时抛出错误。
 */
export function encodeStartParam(payload: StartAppPayload): string {
  const json = JSON.stringify(payload);
  // TextEncoder 在 Node.js 和现代浏览器中均可用
  const bytes = new TextEncoder().encode(json);
  // btoa 只接受 latin1，需借助 Uint8Array → binary string 转换
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  const base64 = btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  if (base64.length > MAX_STARTAPP_BYTES) {
    throw new Error(
      `startapp payload exceeds 512 bytes limit (got ${base64.length} bytes)`,
    );
  }
  return base64;
}

/**
 * 将 URL-safe Base64 字符串解码为 JSON 对象。
 * 解码或解析失败时返回 null，不抛出错误。
 */
export function decodeStartParam<T = StartAppPayload>(raw: string): T | null {
  try {
    // 还原标准 Base64（补回 padding）
    const standard = raw.replace(/-/g, '+').replace(/_/g, '/');
    const padded =
      standard +
      (standard.length % 4 === 0 ? '' : '='.repeat(4 - (standard.length % 4)));
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

/**
 * 生成携带 referrer 参数的 Telegram Mini App 推广链接。
 * 格式：https://t.me/<appName>/?startapp=<encoded>
 */
export function buildReferralLink(options: ReferralLinkOptions): string {
  const { appName, ref, ch } = options;
  const encoded = encodeStartParam({ ref, ch });
  return `https://t.me/${appName}/lbank?startapp=${encoded}`;
}
