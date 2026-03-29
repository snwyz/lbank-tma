# Telegram Mini App SDK 接入方案

文档版本 v1.0 · 内部技术方案

---

## 一、背景与问题

Telegram 官方推荐通过 CDN 方式引入 Web App SDK，以便实时获取最新功能：

```html
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```

然而在生产级 Monorepo 项目中，CDN 方式存在以下核心问题：

- **版本不可控**：Telegram 随时推送新版本，可能导致线上行为突变
- **跨 App 分散维护**：多个 app 各自引入，升级不同步
- **CSP 策略冲突**：严格安全策略下需为外部域名开白名单
- **弱网环境风险**：额外一次外部请求，在弱网地区加载失败率高
- **无法统一定制**：埋点、降级、Mock 等需求无法在 CDN 层实现

基于对竞品 Bybit TG Mini App 的技术调研，结合我们 Monorepo 已有的成熟基建，本方案提出将 TG SDK 封装为独立的 `packages/tg-sdk` 内部包。

---

## 二、竞品调研实现方式

### 2.1 逆向分析结论

通过对 Bybit TG Mini App 的 DevTools 分析，得出以下关键发现：

- 页面中**无 CDN script 标签**（`document.querySelector('script[src*="telegram.org"]')` 返回 null）
- `window.Telegram.WebApp` 对象存在，且由 bundle 主动注入，而非 CDN 全局挂载
- bundle 路径为 `/_next/static/chunks/[hash].js`，来自自有域名，属于 Next.js webpack 产物
- bundle 内含与官方 SDK 完全一致的版本检测逻辑，如 `!Q("6.1")`、`console.warn("[Telegram.WebApp] BackButton is not supported in version...")`

**推断**：Bybit 将官方 SDK 源码 fork 到项目内部，由 Next.js webpack 直接打包进 chunk，并手动注入 `window.Telegram` 全局对象。

### 2.2 Bybit 选择 Bundle 方式的动机

- **稳定性优先**：金融交易平台对生产环境稳定性要求极高，CDN 推送更新可能导致不可预期的行为变更
- **版本锁定**：锁定经过测试的 SDK 版本，不受 Telegram 单方面更新影响
- **可干预能力**：在 SDK 方法层面插入自定义埋点、权限校验和风控逻辑
- **CSP 安全边界**：无需为 `telegram.org` 开白名单，满足金融产品的严格安全策略

---

## 三、我们的方案

将 TG SDK 封装为 Monorepo 内部包 `packages/tg-sdk`，所有 apps 通过 `workspace:*` 统一引用，实现版本可控、结构清晰、跨 App 复用。

### 核心价值

- **版本统一**：`package.json` 锁定版本，一处升级，所有 app 同步生效
- **分层设计**：core / types / hooks / mock / utils 五层职责清晰，独立可测
- **开发体验**：mock 层支持无 TG 客户端的本地开发环境
- **可观测性**：CI 监控机制确保官方 SDK 更新不会无声滞后
- **类型安全**：严格 TypeScript 覆盖，所有 app 共享同一份类型源

---

## 四、packages/tg-sdk 结构设计

### 4.1 完整目录结构

```
packages/tg-sdk/
├── package.json                  # @lbank/tg-sdk，供各 app workspace:* 引用
├── tsconfig.json                 # 严格模式 TypeScript 配置
│
└── src/
    ├── index.ts                  # 统一导出入口
    │
    ├── core/                     # ── 核心层 ──
    │   ├── telegram-web-app.ts   # 官方 SDK 源码（fork 维护或独立实现）
    │   ├── init.ts               # SDK 初始化，注入 window.Telegram
    │   └── version.ts            # 版本兼容检测逻辑
    │
    ├── types/                    # ── 类型层 ──
    │   ├── index.ts              # 完整 TS 类型导出
    │   ├── webapp.types.ts       # WebApp 主体类型定义
    │   └── user.types.ts         # WebAppUser、InitData 等类型
    │
    ├── hooks/                    # ── React Hook 层 ──
    │   ├── useTelegram.ts        # 主 Hook，封装常用 WebApp 方法
    │   ├── useThemeParams.ts     # 主题色、colorScheme 订阅
    │   └── useBackButton.ts      # BackButton 生命周期管理
    │
    ├── mock/                     # ── Mock 层 ──
    │   ├── index.ts              # Mock 注入入口（dev 环境自动激活）
    │   ├── user.mock.ts          # 模拟 WebAppUser 数据
    │   └── webapp.mock.ts        # 模拟完整 WebApp 对象
    │
    └── utils/                    # ── 工具层 ──
        ├── initData.ts           # initData 解析与验证
        └── platform.ts           # 平台检测（iOS / Android / Web）
```

### 4.2 分层职责说明

#### core/ — 核心层

承载 SDK 的本体实现，是整个包的基础：

- **telegram-web-app.ts**：维护官方 SDK 源码或独立实现，与外部完全解耦
- **init.ts**：负责 SSR 安全地将 SDK 注入 `window.Telegram`，统一入口，杜绝多处初始化
- **version.ts**：将版本检测逻辑显式化为可维护的独立模块，对应官方 SDK 中的版本兼容判断

#### types/ — 类型层

完整的 TypeScript 类型定义，严格模式。所有 app 引用同一份类型源，避免各自维护类型声明文件，杜绝运行时类型错误。

#### hooks/ — React Hook 层

对 Next.js 和 Vite React 应用提供开箱即用的 Hook 封装，屏蔽底层 WebApp API 的生命周期细节：

- **useTelegram**：聚合常用方法（user、haptic、showAlert、colorScheme 等）
- **useThemeParams**：响应式订阅主题色变化，适配 TG 深浅色切换
- **useBackButton**：管理 BackButton 的 show/hide/onClick 生命周期，防止事件监听泄漏

#### mock/ — Mock 层

开发者无需真实 TG 客户端即可完整调试：

- dev 环境自动激活，prod 环境 tree-shaking 完全移除，零运行时开销
- 模拟 user、initData、colorScheme、platform 等完整数据结构
- 支持不同场景的 mock preset（如模拟 iOS 用户 / 模拟深色主题）

#### utils/ — 工具层

- **initData.ts**：解析并验证来自 Telegram 的 initData 字符串，供服务端鉴权使用
- **platform.ts**：封装平台判断逻辑，统一处理 iOS / Android / Desktop Web 的差异行为

---

## 五、SDK 版本升级与监控策略

### 5.1 监控流程

```
Telegram 推送 CDN 新版本
        ↓
CI 定时任务 diff 检测（对比 CDN hash 与 core/telegram-web-app.ts）
        ↓
自动创建升级 Issue 并通知负责人
        ↓
staging 环境回归测试
        ↓
合并 PR → 所有 apps/* 同步获得新版本
```

### 5.2 CI 监控脚本

```bash
# scripts/check-tg-sdk-version.sh

REMOTE_HASH=$(curl -s https://telegram.org/js/telegram-web-app.js | md5sum | awk '{print $1}')
LOCAL_HASH=$(md5sum packages/tg-sdk/src/core/telegram-web-app.js | awk '{print $1}')

if [ "$REMOTE_HASH" != "$LOCAL_HASH" ]; then
  echo "⚠️  Telegram SDK 官方版本有更新，请评估是否升级 packages/tg-sdk"
  # 触发 飞书通知 告警
fi
```

### 5.3 升级节奏建议

| 变更类型        | 说明                       | 建议周期                   |
| --------------- | -------------------------- | -------------------------- |
| Breaking Change | 新增必要 API，影响现有功能 | 优先跟进，1 周内完成验证   |
| 功能增强        | 新增可选 API               | 按季度评估，纳入常规迭代   |
| Patch 修复      | Bug 修复                   | 视影响范围决定是否紧急升级 |

---

## 六、结论

将 TG SDK 封装为 `packages/tg-sdk` 内部包，与我们成熟的 pnpm workspaces Monorepo 基建完全契合，无需引入新工具链，落地成本低，长期维护收益高：

- **分层架构**：core / types / hooks / mock / utils 五层清晰分离，职责单一
- **跨 App 复用**：所有 apps 共享同一份 SDK，一处升级全局生效
- **开发体验**：mock 层消除对真实 TG 客户端的依赖，显著提升研发效率
- **可观测性**：CI 监控机制确保官方 SDK 更新不会无声滞后
- **类型安全**：严格 TypeScript 覆盖，所有 app 共享同一份类型源
