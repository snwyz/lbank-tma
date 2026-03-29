import type { WebApp, ThemeParams } from '../types';
import { MOCK_USER } from './user.mock';

const noop = (name: string) =>
  (...args: unknown[]) => {
    console.log(`[TG Mock] ${name} called`, ...args);
  };

const themeParams: ThemeParams = {
  bg_color: '#ffffff',
  text_color: '#000000',
  hint_color: '#707579',
  link_color: '#3390ec',
  button_color: '#3390ec',
  button_text_color: '#ffffff',
  secondary_bg_color: '#f4f4f5',
  header_bg_color: '#ffffff',
  accent_text_color: '#3390ec',
  section_bg_color: '#ffffff',
  section_header_text_color: '#3390ec',
  subtitle_text_color: '#707579',
  destructive_text_color: '#e53935',
};

const makeButtonMock = (type: 'main' | 'secondary') => {
  const callbacks: Array<() => void> = [];
  return {
    type,
    text: '',
    color: '#3390ec',
    textColor: '#ffffff',
    isVisible: false,
    isActive: true,
    isProgressVisible: false,
    setText(text: string) { this.text = text; return this; },
    onClick(cb: () => void) { callbacks.push(cb); return this; },
    offClick(cb: () => void) {
      const idx = callbacks.indexOf(cb);
      if (idx >= 0) callbacks.splice(idx, 1);
      return this;
    },
    show() { this.isVisible = true; console.log(`[TG Mock] ${type}Button.show`); return this; },
    hide() { this.isVisible = false; return this; },
    enable() { this.isActive = true; return this; },
    disable() { this.isActive = false; return this; },
    showProgress(leaveActive?: boolean) {
      this.isProgressVisible = true;
      if (!leaveActive) this.isActive = false;
      return this;
    },
    hideProgress() { this.isProgressVisible = false; this.isActive = true; return this; },
    setParams(params: { text?: string; color?: string; text_color?: string; is_active?: boolean; is_visible?: boolean }) {
      if (params.text !== undefined) this.text = params.text;
      if (params.color !== undefined) this.color = params.color;
      if (params.text_color !== undefined) this.textColor = params.text_color;
      if (params.is_active !== undefined) this.isActive = params.is_active;
      if (params.is_visible !== undefined) this.isVisible = params.is_visible;
      return this;
    },
  };
};

export const MOCK_WEBAPP: WebApp = {
  initData: '',
  initDataUnsafe: {
    user: MOCK_USER,
    auth_date: String(Math.floor(Date.now() / 1000)),
    hash: 'mock_hash',
  },
  version: '8.0',
  platform: 'web',
  colorScheme: 'light',
  themeParams,
  isExpanded: true,
  viewportHeight: 700,
  viewportStableHeight: 700,
  safeAreaInset: { top: 0, bottom: 0, left: 0, right: 0 },
  contentSafeAreaInset: { top: 0, bottom: 0, left: 0, right: 0 },
  isClosingConfirmationEnabled: false,
  isVerticalSwipesEnabled: true,
  isFullscreen: false,
  isOrientationLocked: false,
  isActive: true,
  headerColor: 'bg_color',
  backgroundColor: 'bg_color',
  bottomBarColor: 'bg_color',

  BackButton: {
    isVisible: false,
    show() { this.isVisible = true; console.log('[TG Mock] BackButton.show'); },
    hide() { this.isVisible = false; },
    onClick: noop('BackButton.onClick') as never,
    offClick: noop('BackButton.offClick') as never,
  },
  MainButton: makeButtonMock('main') as WebApp['MainButton'],
  SecondaryButton: makeButtonMock('secondary') as WebApp['SecondaryButton'],
  SettingsButton: {
    isVisible: false,
    show() { this.isVisible = true; },
    hide() { this.isVisible = false; },
    onClick: noop('SettingsButton.onClick') as never,
    offClick: noop('SettingsButton.offClick') as never,
  },
  HapticFeedback: {
    impactOccurred(style) { console.log('[TG Mock] HapticFeedback.impactOccurred', style); return this; },
    notificationOccurred(type) { console.log('[TG Mock] HapticFeedback.notificationOccurred', type); return this; },
    selectionChanged() { console.log('[TG Mock] HapticFeedback.selectionChanged'); return this; },
  },
  CloudStorage: {
    setItem(key, value, cb) { cb?.(null, true); return this; },
    getItem(key, cb) { cb(null, undefined); return this; },
    getItems(keys, cb) { cb(null, {}); return this; },
    removeItem(key, cb) { cb?.(null, true); return this; },
    removeItems(keys, cb) { cb?.(null, true); return this; },
    getKeys(cb) { cb(null, []); return this; },
  },
  SecureStorage: {
    setItem(key, value, cb) { cb?.(null, true); return this; },
    getItem(key, cb) { cb(null, undefined); return this; },
    removeItem(key, cb) { cb?.(null, true); return this; },
  },
  BiometricManager: {
    isInited: false,
    isBiometricAvailable: false,
    biometricType: 'unknown',
    isAccessRequested: false,
    isAccessGranted: false,
    isBiometricTokenSaved: false,
    deviceId: 'mock-device',
    init(cb) { cb?.(); return this; },
    requestAccess(_p, cb) { cb?.(false); return this; },
    authenticate(_p, cb) { cb?.(false); return this; },
    updateBiometricToken(_t, cb) { cb?.(false); return this; },
    openSettings() { return this; },
  },
  LocationManager: {
    isInited: false,
    isLocationAvailable: false,
    isAccessRequested: false,
    isAccessGranted: false,
    init(cb) { cb?.(); return this; },
    getLocation(cb) { cb(null); return this; },
    openSettings() { return this; },
  },
  Accelerometer: {
    isStarted: false,
    x: 0, y: 0, z: 0,
    start(_p, cb) { cb?.(false); return this; },
    stop(cb) { cb?.(); return this; },
  },
  DeviceOrientation: {
    isStarted: false,
    absolute: false,
    alpha: 0, beta: 0, gamma: 0,
    start(_p, cb) { cb?.(false); return this; },
    stop(cb) { cb?.(); return this; },
  },
  Gyroscope: {
    isStarted: false,
    x: 0, y: 0, z: 0,
    start(_p, cb) { cb?.(false); return this; },
    stop(cb) { cb?.(); return this; },
  },

  isVersionAtLeast: (ver) => { console.log('[TG Mock] isVersionAtLeast', ver); return true; },
  setHeaderColor: noop('setHeaderColor') as never,
  setBackgroundColor: noop('setBackgroundColor') as never,
  setBottomBarColor: noop('setBottomBarColor') as never,
  enableClosingConfirmation: noop('enableClosingConfirmation') as never,
  disableClosingConfirmation: noop('disableClosingConfirmation') as never,
  enableVerticalSwipes: noop('enableVerticalSwipes') as never,
  disableVerticalSwipes: noop('disableVerticalSwipes') as never,
  lockOrientation: noop('lockOrientation') as never,
  unlockOrientation: noop('unlockOrientation') as never,
  requestFullscreen: noop('requestFullscreen') as never,
  exitFullscreen: noop('exitFullscreen') as never,
  addToHomeScreen: noop('addToHomeScreen') as never,
  checkHomeScreenStatus: noop('checkHomeScreenStatus') as never,
  onEvent: noop('onEvent') as never,
  offEvent: noop('offEvent') as never,
  sendData: noop('sendData') as never,
  switchInlineQuery: noop('switchInlineQuery') as never,
  openLink: noop('openLink') as never,
  openTelegramLink: noop('openTelegramLink') as never,
  openInvoice: noop('openInvoice') as never,
  showPopup: (_params, cb) => { console.log('[TG Mock] showPopup', _params); cb?.(null); },
  showAlert: (message, cb) => { console.log('[TG Mock] showAlert', message); cb?.(); },
  showConfirm: (message, cb) => { console.log('[TG Mock] showConfirm', message); cb?.(true); },
  showScanQrPopup: noop('showScanQrPopup') as never,
  closeScanQrPopup: noop('closeScanQrPopup') as never,
  readTextFromClipboard: (_cb) => { _cb?.(null); },
  requestWriteAccess: (_cb) => { _cb?.(false); },
  requestContact: (_cb) => { _cb?.(false); },
  downloadFile: noop('downloadFile') as never,
  shareToStory: noop('shareToStory') as never,
  shareMessage: noop('shareMessage') as never,
  setEmojiStatus: noop('setEmojiStatus') as never,
  requestEmojiStatusAccess: (_cb) => { _cb?.(false); },
  invokeCustomMethod: noop('invokeCustomMethod') as never,
  hideKeyboard: noop('hideKeyboard') as never,
  ready: () => { console.log('[TG Mock] ready'); },
  expand: () => { console.log('[TG Mock] expand'); },
  close: noop('close') as never,
};
