/**
 * 比较两个版本号字符串（如 "6.2"、"8.0"）
 * 返回 true 表示 current >= required
 */
export function versionAtLeast(current: string, required: string): boolean {
  const c = current.split('.').map(Number);
  const r = required.split('.').map(Number);
  const len = Math.max(c.length, r.length);
  for (let i = 0; i < len; i++) {
    const cv = c[i] ?? 0;
    const rv = r[i] ?? 0;
    if (cv > rv) return true;
    if (cv < rv) return false;
  }
  return true;
}
