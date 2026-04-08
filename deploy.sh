#!/bin/bash

# Script deploy Kimi K2.5 Worker
# Chạy: bash deploy.sh

echo "🚀 Deploying Kimi K2.5 to Cloudflare Workers..."

# Bước 1: Cài đặt dependencies
echo "📦 Installing dependencies..."
npm install

# Bước 2: Login (sẽ mở browser)
echo "🔐 Logging in to Cloudflare..."
echo "Browser sẽ mở để bạn authorize. Sau khi authorize xong, quay lại terminal."
npx wrangler login

# Bước 3: Deploy
echo "🚀 Deploying worker..."
npx wrangler deploy

echo "✅ Deploy completed!"
echo ""
echo "📝 Next steps:"
echo "1. Copy worker URL từ output phía trên"
echo "2. Test: curl https://YOUR-WORKER-URL/health"
echo "3. Mở demo.html và thay YOUR_WORKER_URL_HERE bằng URL vừa có"
