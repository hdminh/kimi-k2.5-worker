# Deploy Kimi K2.5 lên Cloudflare Workers

## Bước 1: Cài đặt dependencies

```bash
cd kimi-worker
npm install
```

## Bước 2: Login vào Cloudflare

```bash
npx wrangler login
```

Lệnh này sẽ mở browser để bạn đăng nhập vào tài khoản Cloudflare.

## Bước 3: Deploy worker

```bash
npm run deploy
```

Hoặc:

```bash
npx wrangler deploy
```

Sau khi deploy thành công, bạn sẽ nhận được URL của worker, ví dụ:
```
https://kimi-k2-5-worker.your-subdomain.workers.dev
```

## Bước 4: Test worker

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

### Test bằng demo HTML:

1. Mở file `demo.html`
2. Thay `YOUR_WORKER_URL_HERE` bằng URL worker của bạn
3. Mở file trong browser

## Bước 5: Sử dụng trong code

### JavaScript/TypeScript:

```javascript
const response = await fetch('https://your-worker.workers.dev/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'Hello!' }
    ],
    temperature: 0.7,
    stream: false
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);
```

### Python:

```python
import requests

response = requests.post(
    'https://your-worker.workers.dev/v1/chat/completions',
    json={
        'messages': [
            {'role': 'user', 'content': 'Hello!'}
        ],
        'temperature': 0.7
    }
)

print(response.json()['choices'][0]['message']['content'])
```

## Monitoring

Xem logs của worker:

```bash
npx wrangler tail
```

## Update worker

Sau khi chỉnh sửa code, chỉ cần chạy lại:

```bash
npm run deploy
```

## Xóa worker

```bash
npx wrangler delete
```

## Lưu ý

- Workers AI miễn phí cho 10,000 neurons/day
- Sau đó tính phí theo usage:
  - Input: $0.60 per M tokens
  - Cached input: $0.10 per M tokens
  - Output: $3.00 per M tokens
- Sử dụng `x-session-affinity` header để tối ưu prompt caching
