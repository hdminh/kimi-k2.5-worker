Để sử dụng worker tại https://kimi-worker.hodinhminh-vn.workers.dev:

## ⚠️ Cần cấu hình AI Binding trước

Worker đã deploy nhưng thiếu AI binding. Làm theo:

1. Vào: https://dash.cloudflare.com/
2. Workers & Pages → kimi-worker
3. Settings → Variables → Workers AI
4. Add binding: Variable name = `AI`
5. Save và Redeploy

## Sau khi cấu hình xong:

### Test health:
```bash
curl https://kimi-worker.hodinhminh-vn.workers.dev/health
```

### Chat:
```bash
curl -X POST https://kimi-worker.hodinhminh-vn.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Xin chào!"}]}'
```

### Web UI:
Mở file `demo.html`, thay `YOUR_WORKER_URL_HERE` thành:
```
https://kimi-worker.hodinhminh-vn.workers.dev
```

Rồi mở trong browser để chat với giao diện đẹp!
