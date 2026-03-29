#!/usr/bin/env bash
# check-tg-sdk-version.sh
# 对比 Telegram 官方 CDN 上的 telegram-web-app.js 与本地 fork 的 md5，
# 检测官方 SDK 是否有更新。
#
# Exit codes:
#   0 — 无更新，本地与 CDN 一致
#   1 — CDN 有更新，需人工 review
#   2 — 本地 fork 文件不存在

set -euo pipefail

CDN_URL="https://telegram.org/js/telegram-web-app.js"
LOCAL_FILE="packages/tma-sdk/src/lib/telegram-web-app.js"

# ---- 1. 检查本地文件是否存在 ----------------------------------------
if [ ! -f "$LOCAL_FILE" ]; then
  echo "⚠️ 本地 SDK 文件不存在，请检查路径：$LOCAL_FILE" >&2
  exit 2
fi

# ---- 2. 下载 CDN 文件并计算 md5 -------------------------------------
echo "⬇️  正在下载 Telegram CDN SDK..."

TMP_FILE=$(mktemp)
trap 'rm -f "$TMP_FILE"' EXIT

if ! curl -fsSL "$CDN_URL" -o "$TMP_FILE"; then
  echo "❌ 下载失败：$CDN_URL" >&2
  exit 2
fi

# 兼容 macOS（md5）和 Linux（md5sum）
if command -v md5sum &>/dev/null; then
  CDN_MD5=$(md5sum "$TMP_FILE" | awk '{print $1}')
  LOCAL_MD5=$(md5sum "$LOCAL_FILE" | awk '{print $1}')
else
  CDN_MD5=$(md5 -q "$TMP_FILE")
  LOCAL_MD5=$(md5 -q "$LOCAL_FILE")
fi

# ---- 3. 对比 md5 ---------------------------------------------------
echo "CDN   md5: $CDN_MD5"
echo "Local md5: $LOCAL_MD5"

if [ "$CDN_MD5" = "$LOCAL_MD5" ]; then
  echo "✓ Telegram SDK 未发现更新"
  exit 0
else
  echo ""
  echo "⚠️ Telegram SDK 官方版本有更新"
  echo "   请访问 https://core.telegram.org/bots/webapps 查看变更内容，"
  echo "   并评估是否需要更新 packages/tma-sdk 的封装实现。"
  exit 1
fi
