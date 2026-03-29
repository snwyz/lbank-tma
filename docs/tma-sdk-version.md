# @lbank/tma-sdk — Telegram WebApp SDK API 版本文档

## 当前封装版本

| 字段                             | 值                                                        |
| -------------------------------- | --------------------------------------------------------- |
| **Telegram WebApp SDK API 版本** | `9.5`                                                     |
| **声明位置**                     | `packages/tma-sdk/package.json` → `telegramSdkApiVersion` |

## 版本号来源说明

Telegram 官方 SDK（`telegram-web-app.js`）**不遵循 semver**，通过 CDN 持续分发更新，无独立版本发布节点。

版本号 `9.5` 对应 `window.Telegram.WebApp.version`（即 `tgWebAppVersion`）字段，封装时所参考的官方 API 快照版本。

可通过以下方式在运行时读取当前客户端版本：

```ts
import { useWaInfo } from '@lbank/tma-sdk';

const { version } = useWaInfo();
// version === "9.5"（取决于用户所使用的 Telegram 客户端版本）
```

---

## 已支持 API 清单

### Components

| 组件              | 描述                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------- |
| `WebAppProvider`  | 上下文 Provider，应包裹整个应用，初始化 `window.Telegram.WebApp` 并传入 React context |
| `BackButton`      | 声明式控制 Telegram 原生返回按钮，支持 `onClick` 回调                                 |
| `MainButton`      | 声明式控制 Telegram 原生主按钮，支持文字、颜色、加载状态、禁用状态                    |
| `SecondaryButton` | 声明式控制 Telegram 原生辅助按钮（API 7.10+），支持与 MainButton 相同的属性集         |

### Hooks

#### 基础信息

| Hook             | 描述                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------- |
| `useWebApp`      | 返回原始 `window.Telegram.WebApp` 对象，用于访问未封装的底层 API                            |
| `useWaInfo`      | 返回 `{ version, platform, isVersionAtLeast }` — 当前 WebApp 版本号、平台和版本检测方法     |
| `useInitData`    | 返回 Telegram 启动时注入的 `initDataUnsafe` 对象，包含 `user`、`chat`、`start_param` 等字段 |
| `useThemeParams` | 返回当前 Telegram 主题色参数（`bg_color`、`text_color`、`button_color` 等）                 |

#### 界面控制

| Hook                     | 描述                                                                                                  |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `useExpand`              | 返回 `[isExpanded, expand]` — 是否已展开及触发展开的方法                                              |
| `useFullscreen`          | 返回 `{ isFullscreen, requestFullscreen, exitFullscreen }` — 全屏状态控制（API 8.0+）                 |
| `useViewport`            | 返回 `{ viewportHeight, viewportStableHeight, isExpanded }` — 视口尺寸信息                            |
| `useHeaderColor`         | 返回 `{ setHeaderColor }` — 设置顶部导航栏颜色                                                        |
| `useBackgroundColor`     | 返回 `{ setBackgroundColor }` — 设置页面背景色                                                        |
| `useClose`               | 返回关闭 Mini App 的回调函数                                                                          |
| `useClosingConfirmation` | 返回 `{ isClosingEnabled, enableClosingConfirmation, disableClosingConfirmation }` — 关闭确认弹窗控制 |

#### 交互反馈

| Hook                | 描述                                                                             |
| ------------------- | -------------------------------------------------------------------------------- |
| `useHapticFeedback` | 返回 `{ impactOccurred, notificationOccurred, selectionChanged }` — 触觉反馈控制 |
| `useShowAlert`      | 返回展示原生 Alert 弹窗的函数（返回 `Promise<void>`）                            |
| `useShowConfirm`    | 返回展示原生 Confirm 弹窗的函数（返回 `Promise<boolean>`）                       |
| `useShowPopup`      | 返回展示原生 Popup 弹窗的函数，支持自定义按钮（返回 `Promise<string>`）          |

#### 导航与链接

| Hook                   | 描述                                                                     |
| ---------------------- | ------------------------------------------------------------------------ |
| `useOpenLink`          | 返回 `{ openLink, openTelegramLink }` — 打开外部链接或 Telegram 内部链接 |
| `useOpenInvoice`       | 返回打开支付 Invoice 对话框的函数（返回 `Promise<string>`，含支付结果）  |
| `useSwitchInlineQuery` | 返回触发 inline query 切换的函数，支持指定目标聊天类型                   |

#### 数据存储

| Hook               | 描述                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| `useCloudStorage`  | 返回 `{ getItem, setItem, getItems, removeItem, removeItems, getKeys }` — CloudStorage 操作封装（Promise 化） |
| `useCloudItem`     | 接收 key（或 key 数组），返回 `{ loading, data, error }` — 自动从 CloudStorage 读取值                         |
| `useSecureStorage` | 返回 `{ setItem, getItem, restoreItem, deleteItem, clear }` — SecureStorage 操作封装（Promise 化，API 8.0+）  |

#### 传感器与硬件

| Hook               | 描述                                                                                                        |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| `useAccelerometer` | 返回 `{ data, isTracking, startTracking, stopTracking }` — 加速度传感器数据（API 8.0+）                     |
| `useGyroscope`     | 返回 `{ data, isTracking, startTracking, stopTracking }` — 陀螺仪传感器数据（API 8.0+）                     |
| `useOrientation`   | 返回 `{ data, isTracking, startTracking, stopTracking }` — 设备方向传感器数据（alpha/beta/gamma，API 8.0+） |

#### 其他功能

| Hook                       | 描述                                                                                          |
| -------------------------- | --------------------------------------------------------------------------------------------- | -------- |
| `useOnEvent`               | 订阅 Telegram WebApp 原生事件（`viewportChanged`、`themeChanged` 等），组件卸载时自动取消订阅 |
| `useScanQrPopup`           | 返回 `{ openScanQrPopup, closeScanQrPopup }` — 打开/关闭二维码扫描弹窗                        |
| `useReadTextFromClipboard` | 返回读取剪贴板文本的函数（返回 `Promise<string                                                | null>`） |
| `useRequestContact`        | 返回请求用户共享联系方式的函数（返回 `Promise<ContactRequestStatus>`）                        |
| `useRequestWriteAccess`    | 返回请求 Bot 写权限的函数（返回 `Promise<boolean>`）                                          |
| `useShareToStory`          | 返回分享内容到 Telegram Story 的函数（需提供 `mediaUrl`，API 7.8+）                           |
| `useSendData`              | 返回向 Bot 发送消息并关闭 Mini App 的函数（`sendData(data: string)`）                         |

---

## 不支持 / 部分支持的 API 说明

以下 Telegram WebApp API 在当前封装中**未提供专用 Hook/Component**，但可通过 `useWebApp()` 直接访问原始对象操作：

| API                              | 说明                          | 可用版本 |
| -------------------------------- | ----------------------------- | -------- |
| `BiometricManager`               | 生物识别（指纹/面容）认证     | API 7.2+ |
| `LocationManager`                | 请求用户地理位置              | API 8.0+ |
| `EmojiStatusManager`             | 设置用户 Emoji 状态           | API 9.0+ |
| `HomeScreenShortcut`             | 添加到手机主屏幕快捷方式      | API 8.0+ |
| `InternalSticker` / `StickerSet` | Sticker 相关 API              | 特定版本 |
| `setEmojiStatus`                 | 直接设置 Emoji 状态（简化版） | API 9.0+ |
| `downloadFile`                   | 触发文件下载                  | API 8.0+ |
| `shareMessage`                   | 分享消息                      | API 8.0+ |
| `openStickerSet`                 | 打开 Sticker 集合             | API 8.0+ |

> **如需使用以上 API，可通过 `useWebApp()` 获取原始对象：**
>
> ```ts
> const webApp = useWebApp()
> webApp?.BiometricManager?.authenticate(...)
> ```

---

## 版本升级指引

### 何时升级

运行以下命令检测 Telegram 官方 CDN 是否推送了新版本：

```bash
pnpm check-tg-sdk
```

- **exit 0**：CDN 与本地 fork 一致，无需处理
- **exit 1**：CDN 有更新，需人工 review 变更内容后决定是否跟进
- **exit 2**：本地 fork 文件不存在，检查 `packages/tma-sdk/src/core/telegram-web-app.ts` 路径

### 升级步骤

1. 访问 [Telegram WebApp 官方文档](https://core.telegram.org/bots/webapps) 确认新增/变更的 API
2. 下载新版 `telegram-web-app.js` 替换本地 fork 文件
3. 根据 API 变更更新对应的 Hook / Component 实现
4. 同步更新以下位置的版本号：
   - `packages/tma-sdk/package.json` → `telegramSdkApiVersion`
   - `packages/tma-sdk/README.md`
   - 本文件顶部的版本声明表格
5. 运行 `pnpm check-tg-sdk` 验证 hash 一致性

### 参考资源

- [Telegram WebApp 官方文档](https://core.telegram.org/bots/webapps)
- [telegram-web-app.js（CDN）](https://telegram.org/js/telegram-web-app.js)
- [Telegram Bot API 更新日志](https://core.telegram.org/bots/api#recent-changes)
