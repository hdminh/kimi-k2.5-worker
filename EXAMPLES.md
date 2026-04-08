# Kimi K2.5 Examples

## 1. Basic Chat

```bash
curl -X POST https://your-worker.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "system", "content": "You are a helpful assistant"},
      {"role": "user", "content": "Explain quantum computing in simple terms"}
    ],
    "temperature": 0.7
  }'
```

## 2. Multi-turn Conversation

```bash
curl -X POST https://your-worker.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "What is the capital of Vietnam?"},
      {"role": "assistant", "content": "The capital of Vietnam is Hanoi."},
      {"role": "user", "content": "Tell me more about it"}
    ]
  }'
```

## 3. Streaming Response

```bash
curl -X POST https://your-worker.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Write a short story about a robot"}
    ],
    "stream": true
  }'
```

## 4. Function Calling - Weather

```bash
curl -X POST https://your-worker.workers.dev/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "What is the weather in Tokyo?"}
    ],
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "get_weather",
          "description": "Get current weather for a location",
          "parameters": {
            "type": "object",
            "properties": {
              "location": {
                "type": "string",
                "description": "City name"
              },
              "unit": {
                "type": "string",
                "enum": ["celsius", "fahrenheit"],
                "description": "Temperature unit"
              }
            },
            "required": ["location"]
          }
        }
      }
    ]
  }'
```

## 5. Function Calling - Calculator

```bash
curl -X POST https://your-worker.workers.dev/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Calculate 15% tip on $85.50"}
    ],
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "calculate",
          "description": "Perform mathematical calculations",
          "parameters": {
            "type": "object",
            "properties": {
              "expression": {
                "type": "string",
                "description": "Math expression to evaluate"
              }
            },
            "required": ["expression"]
          }
        }
      }
    ]
  }'
```

## 6. JSON Mode

```bash
curl -X POST https://your-worker.workers.dev/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Extract person info: John Doe, 30 years old, lives in NYC"}
    ],
    "response_format": {
      "type": "json_object"
    }
  }'
```

## 7. Structured Output with JSON Schema

```bash
curl -X POST https://your-worker.workers.dev/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Generate a user profile for Alice"}
    ],
    "response_format": {
      "type": "json_schema",
      "json_schema": {
        "name": "user_profile",
        "schema": {
          "type": "object",
          "properties": {
            "name": {"type": "string"},
            "age": {"type": "number"},
            "email": {"type": "string"},
            "interests": {
              "type": "array",
              "items": {"type": "string"}
            }
          },
          "required": ["name", "age", "email"]
        }
      }
    }
  }'
```

## 8. With Session Affinity (Prompt Caching)

```bash
curl -X POST https://your-worker.workers.dev/chat \
  -H "Content-Type: application/json" \
  -H "x-session-affinity: user-123-session" \
  -d '{
    "messages": [
      {"role": "user", "content": "Remember: my favorite color is blue"},
      {"role": "assistant", "content": "Got it! Your favorite color is blue."},
      {"role": "user", "content": "What is my favorite color?"}
    ]
  }'
```

## 9. Code Generation

```bash
curl -X POST https://your-worker.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Write a Python function to calculate fibonacci numbers"}
    ],
    "temperature": 0.3
  }'
```

## 10. Translation

```bash
curl -X POST https://your-worker.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "system", "content": "You are a translator"},
      {"role": "user", "content": "Translate to Vietnamese: Hello, how are you today?"}
    ]
  }'
```

## 11. Summarization

```bash
curl -X POST https://your-worker.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Summarize this article: [long text here...]"}
    ],
    "max_tokens": 200
  }'
```

## 12. Creative Writing

```bash
curl -X POST https://your-worker.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Write a haiku about artificial intelligence"}
    ],
    "temperature": 1.2
  }'
```

## Python Examples

```python
from client import KimiClient

client = KimiClient("https://your-worker.workers.dev")

# Simple chat
response = client.chat(
    messages=[
        {"role": "user", "content": "Hello!"}
    ]
)
print(response)

# Streaming
for chunk in client.chat(
    messages=[{"role": "user", "content": "Tell me a joke"}],
    stream=True
):
    print(chunk, end='', flush=True)
```

## Node.js Examples

```typescript
import { KimiClient } from './client';

const client = new KimiClient('https://your-worker.workers.dev');

// Simple chat
const response = await client.chat({
  messages: [
    { role: 'user', content: 'Hello!' }
  ]
});
console.log(response);

// Streaming
for await (const chunk of client.chatStream({
  messages: [{ role: 'user', content: 'Tell me a joke' }]
})) {
  process.stdout.write(chunk);
}
```
