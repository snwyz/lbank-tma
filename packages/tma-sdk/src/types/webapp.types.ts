import { InitDataUnsafe } from './user.types';
import {
  BackButton,
  BottomButton,
  SettingsButton,
  HapticFeedback,
  CloudStorage,
  SecureStorage,
  BiometricManager,
  LocationManager,
  Accelerometer,
  DeviceOrientation,
  Gyroscope,
} from './components.types';

export type ColorScheme = 'light' | 'dark';
export type ThemeColor =
  | 'bg_color'
  | 'secondary_bg_color'
  | 'accent_text_color'
  | 'button_color'
  | 'button_text_color'
  | 'destructive_text_color'
  | 'header_bg_color'
  | 'hint_color'
  | 'link_color'
  | 'section_bg_color'
  | 'section_header_text_color'
  | 'subtitle_text_color'
  | 'text_color';
export type HeaderColor = 'bg_color' | 'secondary_bg_color' | `#${string}`;
export type BackgroundColor = 'bg_color' | 'secondary_bg_color' | `#${string}`;
export type BottomBarColor =
  | 'bg_color'
  | 'secondary_bg_color'
  | 'bottom_bar_bg_color'
  | `#${string}`;

export type ThemeParams = Partial<Record<ThemeColor, string>>;

export type EventType =
  | 'themeChanged'
  | 'viewportChanged'
  | 'mainButtonClicked'
  | 'secondaryButtonClicked'
  | 'backButtonClicked'
  | 'settingsButtonClicked'
  | 'invoiceClosed'
  | 'popupClosed'
  | 'qrTextReceived'
  | 'scanQrPopupClosed'
  | 'clipboardTextReceived'
  | 'writeAccessRequested'
  | 'contactRequested'
  | 'biometricManagerUpdated'
  | 'biometricAuthRequested'
  | 'biometricTokenUpdated'
  | 'fullscreenChanged'
  | 'fullscreenFailed'
  | 'homeScreenAdded'
  | 'homeScreenChecked'
  | 'accelerometerChanged'
  | 'deviceOrientationChanged'
  | 'gyroscopeChanged'
  | 'locationManagerUpdated'
  | 'locationRequested'
  | 'shareMessageSent'
  | 'shareMessageFailed'
  | 'emojiStatusSet'
  | 'emojiStatusFailed'
  | 'emojiStatusAccessRequested'
  | 'fileDownloadRequested'
  | (string & {});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventCallback = (...args: any[]) => void;

export interface PopupButton {
  id?: string;
  type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
  text?: string;
}

export interface PopupParams {
  title?: string;
  message: string;
  buttons?: PopupButton[];
}

export interface ScanQrPopupParams {
  text?: string;
}

export interface WebApp {
  // ── 数据属性 ──
  readonly initData: string;
  readonly initDataUnsafe: InitDataUnsafe;
  readonly version: string;
  readonly platform: string;
  readonly colorScheme: ColorScheme;
  readonly themeParams: ThemeParams;

  // ── 视口属性 ──
  readonly isExpanded: boolean;
  readonly viewportHeight: number;
  readonly viewportStableHeight: number;
  readonly safeAreaInset: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  readonly contentSafeAreaInset: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };

  // ── 状态属性（可读写）──
  isClosingConfirmationEnabled: boolean;
  isVerticalSwipesEnabled: boolean;
  readonly isFullscreen: boolean;
  isOrientationLocked: boolean;
  readonly isActive: boolean;
  headerColor: HeaderColor;
  backgroundColor: BackgroundColor;
  bottomBarColor: BottomBarColor;

  // ── 子对象 ──
  readonly BackButton: BackButton;
  readonly MainButton: BottomButton;
  readonly SecondaryButton: BottomButton;
  readonly SettingsButton: SettingsButton;
  readonly HapticFeedback: HapticFeedback;
  readonly CloudStorage: CloudStorage;
  readonly SecureStorage: SecureStorage;
  readonly BiometricManager: BiometricManager;
  readonly LocationManager: LocationManager;
  readonly Accelerometer: Accelerometer;
  readonly DeviceOrientation: DeviceOrientation;
  readonly Gyroscope: Gyroscope;

  // ── 方法 ──
  isVersionAtLeast(ver: string): boolean;
  setHeaderColor(color: HeaderColor): void;
  setBackgroundColor(color: BackgroundColor): void;
  setBottomBarColor(color: BottomBarColor): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  enableVerticalSwipes(): void;
  disableVerticalSwipes(): void;
  lockOrientation(): void;
  unlockOrientation(): void;
  requestFullscreen(): void;
  exitFullscreen(): void;
  addToHomeScreen(): void;
  checkHomeScreenStatus(
    callback?: (status: 'unsupported' | 'unknown' | 'added' | 'missed') => void,
  ): void;
  onEvent(eventType: EventType, callback: EventCallback): void;
  offEvent(eventType: EventType, callback: EventCallback): void;
  sendData(data: string): void;
  switchInlineQuery(
    query: string,
    chooseChatTypes?: Array<'users' | 'bots' | 'groups' | 'channels'>,
  ): void;
  openLink(
    url: string,
    options?: { try_instant_view?: boolean; try_browser?: string },
  ): void;
  openTelegramLink(url: string, options?: { force_request?: boolean }): void;
  openInvoice(url: string, callback?: (status: string) => void): void;
  showPopup(
    params: PopupParams,
    callback?: (buttonId: string | null) => void,
  ): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
  showScanQrPopup(
    params?: ScanQrPopupParams,
    callback?: (text: string) => boolean | void,
  ): void;
  closeScanQrPopup(): void;
  readTextFromClipboard(callback?: (text: string | null) => void): void;
  requestWriteAccess(callback?: (granted: boolean) => void): void;
  requestContact(callback?: (contact: unknown | false) => void): void;
  downloadFile(
    params: { url: string; file_name: string },
    callback?: (accepted: boolean) => void,
  ): void;
  shareToStory(
    mediaUrl: string,
    params?: { text?: string; widget_link?: { url: string; name?: string } },
  ): void;
  shareMessage(msgId: string, callback?: (sent: boolean) => void): void;
  setEmojiStatus(
    customEmojiId: string,
    params?: { duration?: number },
    callback?: (set: boolean) => void,
  ): void;
  requestEmojiStatusAccess(callback?: (granted: boolean) => void): void;
  invokeCustomMethod(
    method: string,
    params: object,
    callback?: (error: string | null, result?: unknown) => void,
  ): void;
  hideKeyboard(): void;
  ready(): void;
  expand(): void;
  close(options?: { return_back?: boolean }): void;
}

export type TelegramWindow = Window & {
  Telegram?: {
    WebApp?: WebApp;
  };
};
