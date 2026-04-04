# Waveme 隐私合规访客分析系统

## 核心原则

1. **最小化数据收集** - 只收集实现功能所需的最少字段
2. **去标识化** - 不存储 PII；城市级别位置；IP 仅用于解析后丢弃
3. **用户可控** - 用户可一键删除数据，可关闭访客分析
4. **可审计** - 所有访问记录可审计

## 隐私承诺

> "你的简历属于你，不属于 WaveMe。"
> 
> "我们只帮你展示，不帮你收集。"

## 技术架构

### 前端埋点 SDK

```typescript
// 轻量级 JS SDK，注入到每个用户主页
interface TrackingEvent {
  siteId: string;        // 站点ID
  sessionId: string;     // 会话ID
  event: 'pageview' | 'click' | 'scroll' | 'conversion';
  page: string;          // 页面路径
  metadata: {
    referrer?: string;
    scrollDepth?: number;
    elementId?: string;
  };
  device: string;        // 设备类型
  timestamp: string;     // ISO 8601
}
```

**不收集的信息：**
- 姓名、邮箱、LinkedIn 等 PII
- IP 地址（仅用于城市解析后丢弃）
- 屏幕录屏（除非用户明确同意）

### 后端 API

#### POST /api/track
接收前端事件，验证 token，解析 IP 为城市后丢弃 IP

#### GET /api/stats?siteId=xxx&period=7d
返回聚合指标：PV, UV, avgDuration, topPages, heatmap

#### GET /api/events?siteId=xxx&limit=100
实时事件流（匿名化）

#### POST /api/resume/upload
上传简历文件（加密存储），触发解析任务

#### POST /api/resume/delete
用户一键删除简历与解析数据

#### GET /api/privacy/fields?resumeId=xxx
展示解析后保留字段与被过滤字段

### 数据模型

```sql
-- events 表
CREATE TABLE events (
  id UUID PRIMARY KEY,
  site_id UUID NOT NULL,
  session_id UUID NOT NULL,
  event_type TEXT NOT NULL, -- pageview|click|scroll|conversion
  page TEXT NOT NULL,
  metadata JSONB,
  city TEXT, -- 解析后存储
  device TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- sessions 表
CREATE TABLE sessions (
  session_id UUID PRIMARY KEY,
  site_id UUID NOT NULL,
  start_at TIMESTAMPTZ DEFAULT NOW(),
  end_at TIMESTAMPTZ,
  duration_seconds INT
);

-- resumes 表
CREATE TABLE resumes (
  resume_id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  storage_key TEXT NOT NULL, -- S3 路径，内容加密
  parsed_json JSONB, -- 仅保留非敏感字段
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 敏感字段过滤

简历解析器自动识别并移除：
- 电话号码
- 邮箱地址
- 身份证号
- 详细地址
- 其他 PII

### 加密策略

- **传输**：TLS 1.3
- **存储**：服务端加密（KMS 管理密钥）
- **文件**：AES-256 加密存储

### 删除机制

- 一键删除 API
- 立即清除文件与 DB 记录
- 写入审计日志

## 合规功能

### 隐私模式

用户可关闭访客分析，保护访问者隐私

### 搜索引擎控制

可勾选防止搜索引擎抓取

### 数据导出

用户可导出所有自己的数据

## 成本说明

| 服务 | 费用 | 说明 |
|------|------|------|
| Supabase (Postgres) | 免费起步，$25/月 Pro | 数据库和认证 |
| Vercel | 免费起步，$20/月 Pro | 前端托管 |
| S3 存储 | 按用量计费 | 简历文件存储 |
| Cloudflare | 免费 | CDN 和 WAF |

## 推荐技术栈

- **前端**: Next.js + React + TypeScript
- **后端**: Next.js API Routes / Supabase Edge Functions
- **数据库**: Supabase Postgres
- **缓存**: Redis (会话临时存储)
- **文件存储**: AWS S3 / Cloudflare R2
- **监控**: Sentry + Vercel Analytics
- **安全**: Cloudflare WAF + HTTPS

## 实施优先级

1. P0: 基础埋点 SDK + 事件收集
2. P0: 数据库存储 + 加密
3. P1: 聚合统计 API
4. P1: 隐私模式开关
5. P2: 热力图 + 实时事件流
6. P2: 自动洞察引擎
