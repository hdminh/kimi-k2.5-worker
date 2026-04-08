/**
 * Node.js/TypeScript client cho Kimi K2.5 Worker
 */

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatOptions {
  messages: Message[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

interface Tool {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: object;
  };
}

interface CompletionOptions {
  messages: Message[];
  temperature?: number;
  max_tokens?: number;
  tools?: Tool[];
  tool_choice?: string | object;
}

export class KimiClient {
  private workerUrl: string;

  constructor(workerUrl: string) {
    this.workerUrl = workerUrl.replace(/\/$/, '');
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<{ status: string; model: string }> {
    const response = await fetch(`${this.workerUrl}/health`);
    if (!response.ok) throw new Error(`Health check failed: ${response.statusText}`);
    return response.json();
  }

  /**
   * Chat (non-streaming)
   */
  async chat(options: ChatOptions): Promise<any> {
    const response = await fetch(`${this.workerUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: options.messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.max_tokens,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Chat failed: ${error.error || response.statusText}`);
    }

    return response.json();
  }

  /**
   * Chat (streaming)
   */
  async *chatStream(options: ChatOptions): AsyncGenerator<string> {
    const response = await fetch(`${this.workerUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: options.messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.max_tokens,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Chat stream failed: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') return;

          try {
            const json = JSON.parse(data);
            const content = json.response || json.choices?.[0]?.delta?.content || '';
            if (content) yield content;
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }
  }

  /**
   * OpenAI-compatible chat completion
   */
  async chatCompletion(options: CompletionOptions): Promise<any> {
    const response = await fetch(`${this.workerUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: '@cf/moonshotai/kimi-k2.5',
        messages: options.messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.max_tokens,
        tools: options.tools,
        tool_choice: options.tool_choice,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Completion failed: ${error.error || response.statusText}`);
    }

    return response.json();
  }
}

// Example usage
async function main() {
  const client = new KimiClient('https://your-worker.workers.dev');

  // Health check
  console.log('Health:', await client.healthCheck());

  // Simple chat
  console.log('\n=== Simple Chat ===');
  const response = await client.chat({
    messages: [
      { role: 'system', content: 'You are a helpful assistant' },
      { role: 'user', content: 'Hello!' },
    ],
  });
  console.log(response);

  // Streaming
  console.log('\n=== Streaming ===');
  for await (const chunk of client.chatStream({
    messages: [{ role: 'user', content: 'Count from 1 to 5' }],
  })) {
    process.stdout.write(chunk);
  }
  console.log();

  // Function calling
  console.log('\n=== Function Calling ===');
  const completion = await client.chatCompletion({
    messages: [{ role: 'user', content: 'What is the weather in Hanoi?' }],
    tools: [
      {
        type: 'function',
        function: {
          name: 'get_weather',
          description: 'Get weather information',
          parameters: {
            type: 'object',
            properties: {
              location: { type: 'string' },
            },
            required: ['location'],
          },
        },
      },
    ],
  });
  console.log(completion);
}

if (require.main === module) {
  main().catch(console.error);
}
