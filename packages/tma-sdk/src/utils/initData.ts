import type { InitDataUnsafe, WebAppUser, WebAppChat } from '../types';

/**
 * 解析 URL 编码的 initData 字符串为 InitDataUnsafe 对象
 * initData 格式: key=value&key=value，其中 user/chat 等字段值为 JSON 字符串
 */
export function parseInitData(raw: string): InitDataUnsafe {
  const params = new URLSearchParams(raw);
  const result: Record<string, unknown> = {};

  for (const [key, value] of params.entries()) {
    try {
      result[key] = JSON.parse(decodeURIComponent(value));
    } catch {
      result[key] = value;
    }
  }

  return result as unknown as InitDataUnsafe;
}

export function getInitDataUser(initDataUnsafe: InitDataUnsafe): WebAppUser | undefined {
  return initDataUnsafe.user;
}

export function getInitDataChat(initDataUnsafe: InitDataUnsafe): WebAppChat | undefined {
  return initDataUnsafe.chat;
}
