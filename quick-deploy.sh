#!/bin/bash
# Quick deploy với token
# Usage: bash quick-deploy.sh YOUR_GITHUB_TOKEN

if [ -z "$1" ]; then
    echo "Usage: bash quick-deploy.sh YOUR_GITHUB_TOKEN"
    echo ""
    echo "Tạo token tại: https://github.com/settings/tokens/new"
    echo "Scope cần: repo"
    exit 1
fi

export GITHUB_TOKEN=$1

echo "🔐 Authenticating..."
echo $GITHUB_TOKEN | gh auth login --with-token

echo "📦 Creating repo..."
gh repo create kimi-k2.5-worker \
    --public \
    --description "Cloudflare Worker for Kimi K2.5 AI model - 256k context, function calling, streaming" \
    --source=. \
    --push

echo "✅ Done!"
gh repo view --web
