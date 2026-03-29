# @lbank/tma-sdk

LBank 内部对 **Telegram WebApp JS SDK** 的 React 封装，提供 Hooks、Components 及 TypeScript 类型定义，供各 App 通过 pnpm workspace 直接引用。

## Telegram WebApp SDK API 版本

**本包当前封装的 Telegram WebApp SDK API 版本为：`9.5`**

版本声明同步维护在 `package.json` 的 `telegramSdkApiVersion` 字段：

```json
{
  "telegramSdkApiVersion": "9.5"
}
```

> Telegram 官方 SDK 通过 CDN 持续更新，没有独立的 semver 发布。版本号 `9.5` 对应封装时所参考的 `window.Telegram.WebApp` API 版本（`tgWebAppVersion`）。

## 安装与引用

本包通过 pnpm workspace 引用，无需单独发布：

```jsonc
// 在消费包的 package.json 中
{
  "dependencies": {
    "@lbank/tma-sdk": "workspace:*",
  },
}
```

```tsx
import { WebAppProvider, useInitData, useHapticFeedback } from '@lbank/tma-sdk';
```

## 快速上手

```tsx
// app/layout.tsx 或入口文件
import { WebAppProvider } from '@lbank/tma-sdk';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WebAppProvider>{children}</WebAppProvider>;
}
```

```tsx
// 在任意子组件中
import { useInitData, useHapticFeedback } from '@lbank/tma-sdk';

function MyComponent() {
  const initData = useInitData();
  const { impactOccurred } = useHapticFeedback();

  return (
    <button onClick={() => impactOccurred('medium')}>
      Hello, {initData?.user?.firstName}
    </button>
  );
}
```

## 文档

完整 API 支持清单、版本升级流程详见 [`docs/tma-sdk-version.md`](../../docs/tma-sdk-version.md)。

## 升级参考

- [Telegram WebApp 官方文档](https://core.telegram.org/bots/webapps)
- [Telegram WebApp JS（CDN）](https://telegram.org/js/telegram-web-app.js)
- 升级时请运行 `pnpm check-tg-sdk` 检测 CDN 版本是否有变更
