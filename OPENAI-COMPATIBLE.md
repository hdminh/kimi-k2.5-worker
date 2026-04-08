# OpenAI API Compatibility

Worker này tương thích 100% với OpenAI API format.

## Endpoints

### 1. List Models
```bash
curl https://kimi-k2-5-worker.hodinhminh-vn.workers.dev/v1/models
```

Response:
```json
{
  "object": "list",
  "data": [
    {
      "id": "@cf/moonshotai/kimi-k2.5",
      "object": "model",
      "created": 1710892800,
      "owned_by": "moonshot-ai",
      "context_window": 256000,
      "capabilities": {
        "function_calling": true,
        "reasoning": true,
        "vision": true,
        "streaming": true,
        "json_mode": true
      }
    }
  ]
}
```

### 2. Chat Completions
```bash
curl -X POST https://kimi-k2-5-worker.hodinhminh-vn.workers.dev/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-4156ffbdbf27234f67b156f8d7fede85bffa5fd5aa4f76aa8eab0f614dd673ab" \
  -d '{
    "model": "@cf/moonshotai/kimi-k2.5",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

## Sử dụng với OpenAI SDK

### Python:
```python
from openai import OpenAI

client = OpenAI(
    base_url="https://kimi-k2-5-worker.hodinhminh-vn.workers.dev/v1",
    api_key="sk-4156ffbdbf27234f67b156f8d7fede85bffa5fd5aa4f76aa8eab0f614dd673ab"
)

# List models
models = client.models.list()
print(models)

# Chat
response = client.chat.completions.create(
    model="@cf/moonshotai/kimi-k2.5",
    messages=[
        {"role": "user", "content": "Hello!"}
    ]
)
print(response.choices[0].message.content)
```

### Node.js:
```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://kimi-k2-5-worker.hodinhminh-vn.workers.dev/v1',
  apiKey: 'sk-4156ffbdbf27234f67b156f8d7fede85bffa5fd5aa4f76aa8eab0f614dd673ab'
});

// List models
const models = await client.models.list();
console.log(models);

// Chat
const response = await client.chat.completions.create({
  model: '@cf/moonshotai/kimi-k2.5',
  messages: [
    { role: 'user', content: 'Hello!' }
  ]
});
console.log(response.choices[0].message.content);
```

## Tương thích với các tool sử dụng OpenAI API

Bất kỳ tool nào hỗ trợ custom OpenAI endpoint đều có thể dùng worker này:

- **LangChain**
- **LlamaIndex**
- **Cursor IDE**
- **Continue.dev**
- **Chatbox**
- Và nhiều tool khác...

Chỉ cần:
1. Set base URL: `https://kimi-k2-5-worker.hodinhminh-vn.workers.dev/v1`
2. Set API key: `sk-4156ffbdbf27234f67b156f8d7fede85bffa5fd5aa4f76aa8eab0f614dd673ab`
3. Model: `@cf/moonshotai/kimi-k2.5`

## Model Capabilities

- **Context Window**: 256,000 tokens (256k)
- **Function Calling**: ✅ Multi-turn support
- **Reasoning**: ✅ Built-in reasoning mode
- **Vision**: ✅ Image inputs
- **Streaming**: ✅ Real-time responses
- **JSON Mode**: ✅ Structured outputs
