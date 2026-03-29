// BackButton — TG 导航栏返回按钮
export interface BackButton {
  isVisible: boolean;
  show(): void;
  hide(): void;
  onClick(callback: () => void): void;
  offClick(callback: () => void): void;
}

// BottomButton — MainButton / SecondaryButton 共用接口
export interface BottomButton {
  type: 'main' | 'secondary';
  text: string;
  color: string;
  textColor: string;
  isVisible: boolean;
  isActive: boolean;
  isProgressVisible: boolean;
  setText(text: string): BottomButton;
  onClick(callback: () => void): BottomButton;
  offClick(callback: () => void): BottomButton;
  show(): BottomButton;
  hide(): BottomButton;
  enable(): BottomButton;
  disable(): BottomButton;
  showProgress(leaveActive?: boolean): BottomButton;
  hideProgress(): BottomButton;
  setParams(params: {
    text?: string;
    color?: string;
    text_color?: string;
    is_active?: boolean;
    is_visible?: boolean;
  }): BottomButton;
}

// SettingsButton — 设置按钮（齿轮图标）
export interface SettingsButton {
  isVisible: boolean;
  show(): void;
  hide(): void;
  onClick(callback: () => void): void;
  offClick(callback: () => void): void;
}

// HapticFeedback — 触感反馈
export type HapticImpactStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';
export type HapticNotificationType = 'error' | 'success' | 'warning';

export interface HapticFeedback {
  impactOccurred(style: HapticImpactStyle): HapticFeedback;
  notificationOccurred(type: HapticNotificationType): HapticFeedback;
  selectionChanged(): HapticFeedback;
}

// CloudStorage
export interface CloudStorage {
  setItem(
    key: string,
    value: string,
    callback?: (error: string | null, stored?: boolean) => void,
  ): CloudStorage;
  getItem(
    key: string,
    callback: (error: string | null, value?: string) => void,
  ): CloudStorage;
  getItems(
    keys: string[],
    callback: (error: string | null, values?: Record<string, string>) => void,
  ): CloudStorage;
  removeItem(
    key: string,
    callback?: (error: string | null, removed?: boolean) => void,
  ): CloudStorage;
  removeItems(
    keys: string[],
    callback?: (error: string | null, removed?: boolean) => void,
  ): CloudStorage;
  getKeys(
    callback: (error: string | null, keys?: string[]) => void,
  ): CloudStorage;
}

// SecureStorage
export interface SecureStorage {
  setItem(
    key: string,
    value: string,
    callback?: (error: string | null, stored?: boolean) => void,
  ): SecureStorage;
  getItem(
    key: string,
    callback: (error: string | null, value?: string) => void,
  ): SecureStorage;
  removeItem(
    key: string,
    callback?: (error: string | null, removed?: boolean) => void,
  ): SecureStorage;
}

// BiometricManager
export interface BiometricManager {
  isInited: boolean;
  isBiometricAvailable: boolean;
  biometricType: 'finger' | 'face' | 'unknown';
  isAccessRequested: boolean;
  isAccessGranted: boolean;
  isBiometricTokenSaved: boolean;
  deviceId: string;
  init(callback?: () => void): BiometricManager;
  requestAccess(
    params: { reason?: string },
    callback?: (granted: boolean) => void,
  ): BiometricManager;
  authenticate(
    params: { reason?: string },
    callback?: (success: boolean, token?: string) => void,
  ): BiometricManager;
  updateBiometricToken(
    token: string,
    callback?: (updated: boolean) => void,
  ): BiometricManager;
  openSettings(): BiometricManager;
}

// LocationManager
export interface LocationManager {
  isInited: boolean;
  isLocationAvailable: boolean;
  isAccessRequested: boolean;
  isAccessGranted: boolean;
  init(callback?: () => void): LocationManager;
  getLocation(
    callback: (
      locationData: {
        latitude: number;
        longitude: number;
        altitude?: number;
        course?: number;
        speed?: number;
        horizontal_accuracy?: number;
        vertical_accuracy?: number;
        course_accuracy?: number;
        speed_accuracy?: number;
      } | null,
    ) => void,
  ): LocationManager;
  openSettings(): LocationManager;
}

// Accelerometer
export interface Accelerometer {
  isStarted: boolean;
  x: number;
  y: number;
  z: number;
  start(
    params?: { refresh_rate?: number },
    callback?: (started: boolean) => void,
  ): Accelerometer;
  stop(callback?: () => void): Accelerometer;
}

// DeviceOrientation
export interface DeviceOrientation {
  isStarted: boolean;
  absolute: boolean;
  alpha: number;
  beta: number;
  gamma: number;
  start(
    params?: { refresh_rate?: number; need_absolute?: boolean },
    callback?: (started: boolean) => void,
  ): DeviceOrientation;
  stop(callback?: () => void): DeviceOrientation;
}

// Gyroscope
export interface Gyroscope {
  isStarted: boolean;
  x: number;
  y: number;
  z: number;
  start(
    params?: { refresh_rate?: number },
    callback?: (started: boolean) => void,
  ): Gyroscope;
  stop(callback?: () => void): Gyroscope;
}
