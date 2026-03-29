export type Category = 'Component' | 'Hook';

export interface RegistryEntry {
  slug: string;
  name: string;
  category: Category;
  description: string;
  usage: string;
  apiSummary: string;
  hasExample: boolean;
}

export const registry: RegistryEntry[] = [
  // Components
  {
    slug: 'web-app-provider',
    name: 'WebAppProvider',
    category: 'Component',
    description:
      '必须包裹在应用根节点，为所有子组件提供 Telegram WebApp 上下文。',
    usage: `import { WebAppProvider } from '@lbank/tma-sdk';

export default function App() {
  return (
    <WebAppProvider>
      {/* your app */}
    </WebAppProvider>
  );
}`,
    apiSummary: 'Props: children (ReactNode)',
    hasExample: true,
  },
  {
    slug: 'back-button',
    name: 'BackButton',
    category: 'Component',
    description: '控制 Telegram 客户端原生返回按钮的显示与点击回调。',
    usage: `import { BackButton } from '@lbank/tma-sdk';

function MyPage() {
  return (
    <BackButton onClick={() => router.back()} />
  );
}`,
    apiSummary: 'Props: onClick (() => void)',
    hasExample: true,
  },
  {
    slug: 'main-button',
    name: 'MainButton',
    category: 'Component',
    description: '控制 Telegram 客户端底部主按钮的文案、颜色及点击回调。',
    usage: `import { MainButton } from '@lbank/tma-sdk';

function MyPage() {
  return (
    <MainButton
      text="确认"
      color="#3390EC"
      textColor="#ffffff"
      onClick={() => handleSubmit()}
    />
  );
}`,
    apiSummary:
      'Props: text (string), color? (string), textColor? (string), onClick (() => void), disabled? (boolean)',
    hasExample: true,
  },
  {
    slug: 'secondary-button',
    name: 'SecondaryButton',
    category: 'Component',
    description: '控制 Telegram 客户端底部次要按钮（部分 TG 版本支持）。',
    usage: `import { SecondaryButton } from '@lbank/tma-sdk';

function MyPage() {
  return (
    <SecondaryButton
      text="取消"
      onClick={() => handleCancel()}
    />
  );
}`,
    apiSummary: 'Props: text (string), onClick (() => void)',
    hasExample: true,
  },
  // Hooks
  {
    slug: 'use-web-app',
    name: 'useWebApp',
    category: 'Hook',
    description: '获取当前 WebApp 实例，所有其他 Hook 的基础。',
    usage: `import { useWebApp } from '@lbank/tma-sdk';

function MyComponent() {
  const webApp = useWebApp();
  return <div>{webApp?.version}</div>;
}`,
    apiSummary: '返回: WebApp | null',
    hasExample: false,
  },
  {
    slug: 'use-haptic-feedback',
    name: 'useHapticFeedback',
    category: 'Hook',
    description:
      '触发 Telegram 客户端的触觉反馈，支持冲击、通知和选择三种类型。',
    usage: `import { useHapticFeedback } from '@lbank/tma-sdk';

function MyButton() {
  const { impactOccurred, notificationOccurred, selectionChanged } = useHapticFeedback();

  return (
    <button onClick={() => impactOccurred('medium')}>
      轻触反馈
    </button>
  );
}`,
    apiSummary:
      '返回: { impactOccurred, notificationOccurred, selectionChanged }',
    hasExample: true,
  },
  {
    slug: 'use-show-alert',
    name: 'useShowAlert',
    category: 'Hook',
    description: '弹出 Telegram 原生 Alert 弹窗。',
    usage: `import { useShowAlert } from '@lbank/tma-sdk';

function MyComponent() {
  const showAlert = useShowAlert();

  return (
    <button onClick={() => showAlert('操作成功！')}>
      弹窗
    </button>
  );
}`,
    apiSummary: '返回: (message: string) => Promise<void>',
    hasExample: true,
  },
  {
    slug: 'use-show-confirm',
    name: 'useShowConfirm',
    category: 'Hook',
    description: '弹出 Telegram 原生确认框，返回用户选择结果。',
    usage: `import { useShowConfirm } from '@lbank/tma-sdk';

function MyComponent() {
  const showConfirm = useShowConfirm();

  const handleDelete = async () => {
    const confirmed = await showConfirm('确认删除？');
    if (confirmed) deleteItem();
  };
}`,
    apiSummary: '返回: (message: string) => Promise<boolean>',
    hasExample: false,
  },
  {
    slug: 'use-theme-params',
    name: 'useThemeParams',
    category: 'Hook',
    description: '读取 Telegram 客户端当前主题色参数（背景色、文字色等）。',
    usage: `import { useThemeParams } from '@lbank/tma-sdk';

function ThemedCard() {
  const themeParams = useThemeParams();
  return (
    <div style={{ backgroundColor: themeParams?.bg_color }}>
      主题卡片
    </div>
  );
}`,
    apiSummary: '返回: ThemeParams | null',
    hasExample: true,
  },
  {
    slug: 'use-viewport',
    name: 'useViewport',
    category: 'Hook',
    description: '实时获取当前视口高度、稳定高度及是否全屏展开状态。',
    usage: `import { useViewport } from '@lbank/tma-sdk';

function FullscreenPage() {
  const { height, stableHeight, isExpanded } = useViewport();
  return (
    <div style={{ minHeight: stableHeight }}>
      视口高度: {height}px
    </div>
  );
}`,
    apiSummary:
      '返回: { height: number, stableHeight: number, isExpanded: boolean }',
    hasExample: true,
  },
  {
    slug: 'use-init-data',
    name: 'useInitData',
    category: 'Hook',
    description: '获取 Telegram 传递的初始化数据，包含用户信息、chat 信息等。',
    usage: `import { useInitData } from '@lbank/tma-sdk';

function UserCard() {
  const { initDataUnsafe } = useInitData();
  const user = initDataUnsafe?.user;
  return <div>{user?.first_name}</div>;
}`,
    apiSummary:
      '返回: { initData: string | undefined, initDataUnsafe: InitDataUnsafe | undefined }',
    hasExample: true,
  },
  {
    slug: 'use-expand',
    name: 'useExpand',
    category: 'Hook',
    description: '获取展开状态并提供展开 Mini App 至全屏的方法。',
    usage: `import { useExpand } from '@lbank/tma-sdk';

function ExpandButton() {
  const [isExpanded, expand] = useExpand();
  return (
    <button onClick={expand}>
      {isExpanded ? '已全屏' : '全屏展开'}
    </button>
  );
}`,
    apiSummary: '返回: [isExpanded: boolean | undefined, expand: () => void]',
    hasExample: false,
  },
  {
    slug: 'use-close',
    name: 'useClose',
    category: 'Hook',
    description: '关闭 Telegram Mini App。',
    usage: `import { useClose } from '@lbank/tma-sdk';

function CloseButton() {
  const close = useClose();
  return <button onClick={close}>关闭</button>;
}`,
    apiSummary: '返回: () => void',
    hasExample: false,
  },
  {
    slug: 'use-send-data',
    name: 'useSendData',
    category: 'Hook',
    description:
      '向 Telegram Bot 发送数据（仅在通过 keyboard button 打开的 Mini App 中可用）。',
    usage: `import { useSendData } from '@lbank/tma-sdk';

function SubmitButton() {
  const sendData = useSendData();
  return <button onClick={() => sendData('{"action":"confirm"}')}>提交</button>;
}`,
    apiSummary: '返回: (data: string) => void',
    hasExample: false,
  },
  {
    slug: 'use-open-link',
    name: 'useOpenLink',
    category: 'Hook',
    description: '在 Telegram 内置浏览器中打开外部链接。',
    usage: `import { useOpenLink } from '@lbank/tma-sdk';

function LinkButton() {
  const openLink = useOpenLink();
  return (
    <button onClick={() => openLink('https://lbank.com')}>
      打开官网
    </button>
  );
}`,
    apiSummary:
      '返回: (url: string, options?: { try_instant_view?: boolean }) => void',
    hasExample: false,
  },
  {
    slug: 'use-cloud-storage',
    name: 'useCloudStorage',
    category: 'Hook',
    description: '操作 Telegram CloudStorage，支持 get/set/remove/getKeys。',
    usage: `import { useCloudStorage } from '@lbank/tma-sdk';

function StorageDemo() {
  const { setItem, getItem } = useCloudStorage();

  const save = async () => {
    await setItem('token', 'abc123');
    const val = await getItem('token');
    console.log(val); // 'abc123'
  };
}`,
    apiSummary:
      '返回: { getItem, setItem, getItems, removeItem, removeItems, getKeys }',
    hasExample: false,
  },
  {
    slug: 'use-closing-confirmation',
    name: 'useClosingConfirmation',
    category: 'Hook',
    description: '控制关闭 Mini App 时是否弹出确认提示。',
    usage: `import { useClosingConfirmation } from '@lbank/tma-sdk';

function Page() {
  const { enableClosingConfirmation, disableClosingConfirmation } = useClosingConfirmation();
}`,
    apiSummary:
      '返回: { isClosingConfirmationEnabled, enableClosingConfirmation, disableClosingConfirmation }',
    hasExample: false,
  },
  {
    slug: 'use-fullscreen',
    name: 'useFullscreen',
    category: 'Hook',
    description: '请求或退出全屏模式（部分 TG 版本支持）。',
    usage: `import { useFullscreen } from '@lbank/tma-sdk';

function FullscreenToggle() {
  const { isFullscreen, requestFullscreen, exitFullscreen } = useFullscreen();
}`,
    apiSummary:
      '返回: { isFullscreen: boolean, requestFullscreen, exitFullscreen }',
    hasExample: false,
  },
  {
    slug: 'use-switch-inline-query',
    name: 'useSwitchInlineQuery',
    category: 'Hook',
    description:
      '切换到 Telegram Inline 模式并预填充查询词，常用于分享邀请卡片给联系人或群组。需要 Bot 开启 Inline Mode。',
    usage: `import { useSwitchInlineQuery } from '@lbank/tma-sdk';

function InviteButton() {
  const switchInlineQuery = useSwitchInlineQuery();

  return (
    <button onClick={() => switchInlineQuery('join ref_123', ['users', 'groups'])}>
      邀请好友
    </button>
  );
}`,
    apiSummary:
      '返回: (query: string, chooseChatTypes?: Array<"users" | "bots" | "groups" | "channels">) => void',
    hasExample: true,
  },
  {
    slug: 'use-wa-info',
    name: 'useWaInfo',
    category: 'Hook',
    description: '获取 WebApp 版本号、平台信息及版本比较函数。',
    usage: `import { useWaInfo } from '@lbank/tma-sdk';

function VersionBadge() {
  const { version, platform } = useWaInfo();
  return <span>{platform} v{version}</span>;
}`,
    apiSummary:
      '返回: { version: string | null, platform: string | null, isVersionAtLeast }',
    hasExample: false,
  },
];

/** 过滤掉占位条目，只保留有效条目 */
export const validRegistry = registry.filter((e) => e.description !== '');

export function getEntry(slug: string): RegistryEntry | undefined {
  return validRegistry.find((e) => e.slug === slug);
}

export function getSlugs(): string[] {
  return validRegistry.map((e) => e.slug);
}
