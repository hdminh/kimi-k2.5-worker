# Kimi K2.5 Cloudflare Worker

Đã tạo xong project để deploy model Kimi K2.5 lên Cloudflare Workers AI!

## 📁 Cấu trúc project

```
kimi-worker/
├── src/
│   └── index.ts          # Worker code chính
├── client.ts             # TypeScript client
├── client.py             # Python client
├── test.js               # Test script
├── demo.html             # Web demo UI
├── package.json          # Dependencies
├── wrangler.toml         # Cloudflare config
├── tsconfig.json         # TypeScript config
├── README.md             # Hướng dẫn sử dụng
├── DEPLOY.md             # Hướng dẫn deploy
└── EXAMPLES.md           # Ví dụ sử dụng
```

## 🚀 Cách deploy

### 1. Cài đặt dependencies

```bash
cd kimi-worker
npm install
```

### 2. Login Cloudflare

```bash
npx wrangler login
```

### 3. Deploy

```bash
npm run deploy
```

Sau khi deploy xong, bạn sẽ nhận được URL như:
```
https://kimi-k2-5-worker.your-subdomain.workers.dev
```

## ✨ Tính năng

- ✅ **256k context window** - Xử lý văn bản cực dài
- ✅ **Multi-turn tool calling** - Function calling đa lượt
- ✅ **Vision inputs** - Hỗ trợ hình ảnh (nếu cần)
- ✅ **Structured outputs** - JSON schema validation
- ✅ **Streaming** - Real-time response
- ✅ **OpenAI-compatible API** - Dễ tích hợp
- ✅ **CORS enabled** - Gọi từ browser
- ✅ **Prompt caching** - Giảm chi phí với session affinity

## 🧪 Test

### Test bằng curl:

```bash
# Health check
curl https://your-worker.workers.dev/health

# Chat
curl -X POST https://your-worker.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Xin chào!"}
    ]
  }'
```

### Test bằng script:

```bash
node test.js https://your-worker.workers.dev
```

### Test bằng web UI:

1. Mở `demo.html`
2. Thay `YOUR_WORKER_URL_HERE` bằng URL worker của bạn
3. Mở trong browser

## 📊 API Endpoints

### 1. Health Check
```
GET /health
```

### 2. Chat
```
POST /chat
Body: {
  "messages": [...],
  "temperature": 0.7,
  "max_tokens": 1000,
  "stream": false
}
```

### 3. OpenAI Compatible
```
POST /v1/chat/completions
Body: {
  "model": "@cf/moonshotai/kimi-k2.5",
  "messages": [...],
  "tools": [...],
  "temperature": 0.7
}
```

## 💰 Giá

- **Input**: $0.60 per M tokens
- **Cached input**: $0.10 per M tokens (với session affinity)
- **Output**: $3.00 per M tokens
- **Free tier**: 10,000 neurons/day

## 🎯 Sử dụng

### JavaScript/TypeScript:

```typescript
import { KimiClient } from './client';

const client = new KimiClient('https://your-worker.workers.dev');

const response = await client.chat({
  messages: [
    { role: 'user', content: 'Hello!' }
  ]
});
```

### Python:

```python
from client import KimiClient

client = KimiClient("https://your-worker.workers.dev")

response = client.chat(
    messages=[
        {"role": "user", "content": "Hello!"}
    ]
)
```

## 📚 Tài liệu

- `README.md` - Tổng quan và hướng dẫn
- `DEPLOY.md` - Chi tiết deploy
- `EXAMPLES.md` - Ví dụ sử dụng đầy đủ

## 🔧 Tối ưu

Để giảm chi phí và latency, sử dụng header `x-session-affinity`:

```bash
curl -X POST https://your-worker.workers.dev/chat \
  -H "x-session-affinity: user-123-session" \
  -H "Content-Type: application/json" \
  -d '{"messages": [...]}'
```

## 📝 Lưu ý

- Model hỗ trợ tiếng Việt tốt
- Context window 256k tokens (rất lớn!)
- Có thể dùng cho chatbot, code generation, translation, summarization...
- Tương thích với OpenAI API nên dễ migrate

Chúc bạn deploy thành công! 🎉
