export interface Env {
  AI: Ai;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    // Health check endpoint
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', model: '@cf/moonshotai/kimi-k2.5' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Chat endpoint
    if (url.pathname === '/chat' && request.method === 'POST') {
      try {
        const body = await request.json() as any;
        const { messages, stream = false, temperature = 1, max_tokens } = body;

        if (!messages || !Array.isArray(messages)) {
          return new Response(JSON.stringify({ error: 'messages array is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const aiResponse = await env.AI.run('@cf/moonshotai/kimi-k2.5', {
          messages,
          stream,
          temperature,
          ...(max_tokens && { max_tokens }),
        });

        if (stream) {
          return new Response(aiResponse as ReadableStream, {
            headers: {
              ...corsHeaders,
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
            },
          });
        }

        return new Response(JSON.stringify(aiResponse), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // OpenAI-compatible endpoint
    if (url.pathname === '/v1/chat/completions' && request.method === 'POST') {
      try {
        const body = await request.json() as any;
        const { messages, stream = false, temperature = 1, max_tokens, tools, tool_choice } = body;

        if (!messages || !Array.isArray(messages)) {
          return new Response(JSON.stringify({ error: 'messages array is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const aiParams: any = {
          messages,
          stream,
          temperature,
          ...(max_tokens && { max_tokens }),
          ...(tools && { tools }),
          ...(tool_choice && { tool_choice }),
        };

        const aiResponse = await env.AI.run('@cf/moonshotai/kimi-k2.5', aiParams);

        if (stream) {
          return new Response(aiResponse as ReadableStream, {
            headers: {
              ...corsHeaders,
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
            },
          });
        }

        return new Response(JSON.stringify(aiResponse), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Default response
    return new Response(
      JSON.stringify({
        message: 'Kimi K2.5 Worker',
        endpoints: {
          health: '/health',
          chat: '/chat (POST)',
          openai: '/v1/chat/completions (POST)',
        },
        model: '@cf/moonshotai/kimi-k2.5',
        features: [
          '256k context window',
          'Multi-turn tool calling',
          'Vision inputs',
          'Structured outputs',
        ],
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  },
};
