# Kimi K2.5 Cloudflare Worker

Worker để sử dụng model Kimi K2.5 trên Cloudflare Workers AI.

## Tính năng

- Context window 256k tokens
- Multi-turn tool calling
- Vision inputs
- Structured outputs
- Streaming support

## Cài đặt

```bash
cd kimi-worker
npm install
```

## Deploy

```bash
# Login vào Cloudflare (nếu chưa)
npx wrangler login

# Deploy worker
npm run deploy
```

## Sử dụng

### 1. Health Check

```bash
curl https://your-worker.workers.dev/health
```

### 2. Chat Endpoint

```bash
curl -X POST https://your-worker.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "system", "content": "You are a helpful assistant"},
      {"role": "user", "content": "Hello!"}
    ],
    "temperature": 0.7,
    "max_tokens": 1000
  }'
```

### 3. Streaming

```bash
curl -X POST https://your-worker.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Tell me a story"}
    ],
    "stream": true
  }'
```

### 4. OpenAI-Compatible Endpoint

```bash
curl -X POST https://your-worker.workers.dev/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "@cf/moonshotai/kimi-k2.5",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'
```

### 5. Function Calling

```bash
curl -X POST https://your-worker.workers.dev/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "What is the weather in Hanoi?"}
    ],
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "get_weather",
          "description": "Get weather information",
          "parameters": {
            "type": "object",
            "properties": {
              "location": {"type": "string"}
            }
          }
        }
      }
    ]
  }'
```

## Giá

- Input: $0.60 per M tokens
- Cached input: $0.10 per M tokens  
- Output: $3.00 per M tokens

## Tối ưu

Để giảm chi phí và latency, sử dụng header `x-session-affinity` với session ID duy nhất cho multi-turn conversations:

```bash
curl -X POST https://your-worker.workers.dev/chat \
  -H "Content-Type: application/json" \
  -H "x-session-affinity: user-123-session" \
  -d '{"messages": [...]}'
```
