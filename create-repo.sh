#!/bin/bash
# Script tạo GitHub repo và push code
# Yêu cầu: GitHub CLI đã login hoặc có GITHUB_TOKEN

set -e

echo "🚀 Creating GitHub repo and pushing code..."

# Kiểm tra gh auth
if ! gh auth status &>/dev/null; then
    echo "❌ GitHub CLI chưa login!"
    echo ""
    echo "Chọn 1 trong 2 cách:"
    echo ""
    echo "Cách 1: Login với gh CLI"
    echo "  gh auth login"
    echo ""
    echo "Cách 2: Dùng Personal Access Token"
    echo "  export GITHUB_TOKEN=your_token_here"
    echo "  bash create-repo.sh"
    echo ""
    echo "Tạo token tại: https://github.com/settings/tokens/new"
    echo "Scope cần: repo (full control)"
    exit 1
fi

# Tạo repo
echo "📦 Creating repository..."
gh repo create kimi-k2.5-worker \
    --public \
    --description "Cloudflare Worker for Kimi K2.5 AI model - 256k context, function calling, streaming" \
    --source=. \
    --push

echo ""
echo "✅ Done! Repository created and code pushed!"
echo ""
echo "🔗 View your repo:"
gh repo view --web

echo ""
echo "📝 Next steps:"
echo "1. Deploy to Cloudflare: bash deploy.sh"
echo "2. Or deploy via dashboard: see DEPLOY-MANUAL.md"
