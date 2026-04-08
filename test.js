#!/usr/bin/env node

/**
 * Test script cho Kimi K2.5 Worker
 * Chạy: node test.js <worker-url>
 */

const WORKER_URL = process.argv[2] || 'http://localhost:8787';

async function test(name, fn) {
  try {
    console.log(`\n🧪 ${name}...`);
    await fn();
    console.log(`✅ ${name} - PASSED`);
  } catch (error) {
    console.error(`❌ ${name} - FAILED:`, error.message);
  }
}

async function testHealth() {
  const response = await fetch(`${WORKER_URL}/health`);
  const data = await response.json();
  if (data.status !== 'ok') throw new Error('Health check failed');
  console.log('   Response:', data);
}

async function testChat() {
  const response = await fetch(`${WORKER_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: 'You are a helpful assistant' },
        { role: 'user', content: 'Say hello in Vietnamese' }
      ],
      temperature: 0.7,
      max_tokens: 100
    })
  });
  
  const data = await response.json();
  if (!data.response) throw new Error('No response from chat');
  console.log('   Response:', data.response.substring(0, 100) + '...');
}

async function testStreaming() {
  const response = await fetch(`${WORKER_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [
        { role: 'user', content: 'Count from 1 to 5' }
      ],
      stream: true
    })
  });
  
  if (!response.body) throw new Error('No stream body');
  
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let chunks = 0;
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks++;
    const text = decoder.decode(value);
    if (chunks === 1) console.log('   First chunk:', text.substring(0, 50));
  }
  
  console.log(`   Received ${chunks} chunks`);
}

async function testOpenAI() {
  const response = await fetch(`${WORKER_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: '@cf/moonshotai/kimi-k2.5',
      messages: [
        { role: 'user', content: 'What is 2+2?' }
      ],
      temperature: 0.5
    })
  });
  
  const data = await response.json();
  if (!data.choices || !data.choices[0]) throw new Error('Invalid OpenAI response');
  console.log('   Response:', data.choices[0].message.content.substring(0, 100));
}

async function testFunctionCalling() {
  const response = await fetch(`${WORKER_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [
        { role: 'user', content: 'What is the weather in Hanoi?' }
      ],
      tools: [
        {
          type: 'function',
          function: {
            name: 'get_weather',
            description: 'Get current weather for a location',
            parameters: {
              type: 'object',
              properties: {
                location: { type: 'string', description: 'City name' }
              },
              required: ['location']
            }
          }
        }
      ]
    })
  });
  
  const data = await response.json();
  console.log('   Tool calls:', data.choices?.[0]?.message?.tool_calls ? 'Yes' : 'No');
}

async function main() {
  console.log('🚀 Testing Kimi K2.5 Worker');
  console.log(`📍 URL: ${WORKER_URL}`);
  
  await test('Health Check', testHealth);
  await test('Basic Chat', testChat);
  await test('Streaming', testStreaming);
  await test('OpenAI Compatible', testOpenAI);
  await test('Function Calling', testFunctionCalling);
  
  console.log('\n✨ All tests completed!');
}

main().catch(console.error);
