# API Key Authentication

Worker hỗ trợ API key authentication để bảo vệ endpoint.

## Cấu hình API Key

### Cách 1: Qua Wrangler CLI

```bash
# Set API key secret
npx wrangler secret put API_KEY

# Nhập key khi được hỏi, ví dụ: sk-your-secret-key-here
```

### Cách 2: Qua Dashboard

1. Vào https://dash.cloudflare.com/
2. Workers & Pages → chọn worker `kimi-k2-5-worker`
3. Settings → Variables and Secrets
4. Click **Add variable**
5. Type: **Secret**
6. Variable name: `API_KEY`
7. Value: `sk-your-secret-key-here` (tạo key bất kỳ)
8. Save

## Sử dụng với API Key

### Cách 1: Bearer Token (OpenAI style)

```bash
curl -X POST https://kimi-k2-5-worker.hodinhminh-vn.workers.dev/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-your-secret-key-here" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

### Cách 2: X-API-Key Header

```bash
curl -X POST https://kimi-k2-5-worker.hodinhminh-vn.workers.dev/chat \
  -H "Content-Type: application/json" \
  -H "X-API-Key: sk-your-secret-key-here" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

## Trong Code

### JavaScript/TypeScript:

```typescript
import { KimiClient } from './client';

const client = new KimiClient('https://kimi-k2-5-worker.hodinhminh-vn.workers.dev');

// Thêm API key vào headers
const response = await fetch('https://kimi-k2-5-worker.hodinhminh-vn.workers.dev/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer sk-your-secret-key-here'
  },
  body: JSON.stringify({
    messages: [{ role: 'user', content: 'Hello' }]
  })
});
```

### Python:

```python
import requests

headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer sk-your-secret-key-here'
}

response = requests.post(
    'https://kimi-k2-5-worker.hodinhminh-vn.workers.dev/chat',
    headers=headers,
    json={'messages': [{'role': 'user', 'content': 'Hello'}]}
)
```

## Lưu ý

- **Không set API_KEY** = Worker public, ai cũng gọi được
- **Set API_KEY** = Cần authentication, bảo vệ endpoint
- Health check (`/health`) không cần API key
- API key được lưu dưới dạng secret, không hiển thị trong code

## Tạo API Key an toàn

```bash
# Generate random key
openssl rand -base64 32

# Hoặc
node -e "console.log('sk-' + require('crypto').randomBytes(32).toString('hex'))"
```

Ví dụ key: `sk-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6`
