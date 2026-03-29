export interface StartAppPayload {
  /** referrer 用户 ID，必填 */
  ref: string;
  /** 来源渠道标识，可选，默认 "share" */
  ch?: string;
}

export interface ReferralLinkOptions {
  /** Telegram Bot 名称，如 "LBankBot" */
  botName: string;
  /** Telegram Mini App 名称，如 "LBankApp" */
  appName: string;
  /** referrer 用户 ID，必填 */
  ref: string;
  /** 来源渠道标识，可选，默认 "share" */
  ch?: string;
}
