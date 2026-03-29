# Referral API 接口文档

本文档定义裂变归因系统的后端接口契约，供前后端联调参考。

---

## POST /api/referral/attribute

**用途：** 新用户首次启动时，将其与 referrer 进行归因关联，并触发 referrer 积分发放。

### 请求

```http
POST /api/referral/attribute
Content-Type: application/json
```

**请求体：**

```json
{
  "referrerId": "string",
  "initData": "string"
}
```

| 字段         | 类型   | 必填 | 说明                                                       |
| ------------ | ------ | ---- | ---------------------------------------------------------- |
| `referrerId` | string | ✓    | referrer 的 Telegram 用户 ID（从 startapp 参数解码）       |
| `initData`   | string | ✓    | `window.Telegram.WebApp.initData` 原始字符串，用于后端验签 |

### 验签要求

后端 **MUST** 使用 Bot Token 对 `initData` 执行 HMAC-SHA256 验签（参考 [Telegram 官方文档](https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app)）。验签失败 **MUST** 返回 `401`，不执行任何数据库写入。

### 响应

**200 OK（首次归因）：**

```json
{
  "success": true,
  "isNew": true
}
```

**200 OK（重复请求，幂等）：**

```json
{
  "success": true,
  "isNew": false
}
```

**401 Unauthorized（initData 验签失败）：**

```json
{
  "error": "Unauthorized"
}
```

### 幂等设计

同一 `(referrerId, newUserId)` 对的归因记录 **MUST** 只写入一次。后端应使用唯一约束（如 `UNIQUE(referrer_id, new_user_id)`）+ `INSERT ... ON CONFLICT DO NOTHING` 实现幂等，重复请求返回 `200` 而非错误。

### 积分发放

后端在 `isNew: true` 时，**MUST** 在同一事务内向 referrer 发放积分奖励（默认 10 分，可配置）。积分记录 **MUST** 包含关联的 `referralId`，用于审计和幂等去重。

---

## GET /api/referral/stats

**用途：** 获取当前登录用户的邀请统计数据，用于分享页展示。

### 请求

```http
GET /api/referral/stats
```

当前用户身份通过 `initData` 鉴权（建议在请求头中传递）：

```http
GET /api/referral/stats
X-Telegram-Init-Data: <initData>
```

### 响应

**200 OK：**

```json
{
  "inviteCount": 3,
  "totalPoints": 30
}
```

| 字段          | 类型   | 说明                             |
| ------------- | ------ | -------------------------------- |
| `inviteCount` | number | 成功邀请并完成首次归因的用户数量 |
| `totalPoints` | number | 通过邀请累计获得的积分总和       |

**无邀请记录时：**

```json
{
  "inviteCount": 0,
  "totalPoints": 0
}
```

返回零值，不返回错误。

---

## startapp 参数格式

前端使用 URL-safe Base64 编码（无 padding）传递 JSON payload：

```
https://t.me/<BotName>/<AppName>?startapp=<encoded>
```

**Payload JSON schema：**

```json
{
  "ref": "123456789",
  "ch": "share"
}
```

| 字段  | 类型   | 必填 | 说明                         |
| ----- | ------ | ---- | ---------------------------- |
| `ref` | string | ✓    | referrer 的 Telegram 用户 ID |
| `ch`  | string | ✗    | 来源渠道，默认 `"share"`     |

**编码规则：** `JSON.stringify(payload)` → UTF-8 → Base64 URL-safe（`+`→`-`，`/`→`_`，去除 `=`），总长度不超过 512 字节。
