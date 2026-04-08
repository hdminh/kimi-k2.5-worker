"""
Python client cho Kimi K2.5 Worker
"""

import requests
from typing import List, Dict, Optional, Iterator
import json


class KimiClient:
    def __init__(self, worker_url: str):
        """
        Khởi tạo client
        
        Args:
            worker_url: URL của Cloudflare Worker (ví dụ: https://your-worker.workers.dev)
        """
        self.worker_url = worker_url.rstrip('/')
        self.session = requests.Session()
    
    def health_check(self) -> Dict:
        """Kiểm tra health của worker"""
        response = self.session.get(f"{self.worker_url}/health")
        response.raise_for_status()
        return response.json()
    
    def chat(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        stream: bool = False
    ) -> Dict:
        """
        Gửi chat request
        
        Args:
            messages: Danh sách messages [{"role": "user", "content": "..."}]
            temperature: Nhiệt độ sampling (0-2)
            max_tokens: Số tokens tối đa
            stream: Có streaming hay không
        
        Returns:
            Response dict hoặc generator nếu stream=True
        """
        payload = {
            "messages": messages,
            "temperature": temperature,
            "stream": stream
        }
        
        if max_tokens:
            payload["max_tokens"] = max_tokens
        
        if stream:
            return self._stream_chat(payload)
        
        response = self.session.post(
            f"{self.worker_url}/chat",
            json=payload
        )
        response.raise_for_status()
        return response.json()
    
    def _stream_chat(self, payload: Dict) -> Iterator[str]:
        """Stream chat response"""
        response = self.session.post(
            f"{self.worker_url}/chat",
            json=payload,
            stream=True
        )
        response.raise_for_status()
        
        for line in response.iter_lines():
            if line:
                line = line.decode('utf-8')
                if line.startswith('data: '):
                    data = line[6:]
                    if data == '[DONE]':
                        break
                    try:
                        json_data = json.loads(data)
                        content = json_data.get('response', '')
                        if content:
                            yield content
                    except json.JSONDecodeError:
                        continue
    
    def chat_completion(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
        tools: Optional[List[Dict]] = None,
        tool_choice: Optional[str] = None
    ) -> Dict:
        """
        OpenAI-compatible chat completion
        
        Args:
            messages: Danh sách messages
            temperature: Nhiệt độ sampling
            max_tokens: Số tokens tối đa
            tools: Danh sách tools cho function calling
            tool_choice: Cách chọn tool ("auto", "none", hoặc specific tool)
        
        Returns:
            OpenAI-compatible response
        """
        payload = {
            "model": "@cf/moonshotai/kimi-k2.5",
            "messages": messages,
            "temperature": temperature
        }
        
        if max_tokens:
            payload["max_tokens"] = max_tokens
        if tools:
            payload["tools"] = tools
        if tool_choice:
            payload["tool_choice"] = tool_choice
        
        response = self.session.post(
            f"{self.worker_url}/v1/chat/completions",
            json=payload
        )
        response.raise_for_status()
        return response.json()


# Example usage
if __name__ == "__main__":
    # Khởi tạo client
    client = KimiClient("https://your-worker.workers.dev")
    
    # Health check
    print("Health check:", client.health_check())
    
    # Simple chat
    print("\n=== Simple Chat ===")
    response = client.chat(
        messages=[
            {"role": "system", "content": "You are a helpful assistant"},
            {"role": "user", "content": "Xin chào! Bạn là ai?"}
        ],
        temperature=0.7
    )
    print(response)
    
    # Streaming chat
    print("\n=== Streaming Chat ===")
    for chunk in client.chat(
        messages=[
            {"role": "user", "content": "Đếm từ 1 đến 5"}
        ],
        stream=True
    ):
        print(chunk, end='', flush=True)
    print()
    
    # Function calling
    print("\n=== Function Calling ===")
    response = client.chat_completion(
        messages=[
            {"role": "user", "content": "Thời tiết ở Hà Nội thế nào?"}
        ],
        tools=[
            {
                "type": "function",
                "function": {
                    "name": "get_weather",
                    "description": "Lấy thông tin thời tiết",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "location": {
                                "type": "string",
                                "description": "Tên thành phố"
                            }
                        },
                        "required": ["location"]
                    }
                }
            }
        ]
    )
    print(response)
