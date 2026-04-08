#!/bin/bash
# Script push lên GitHub
# Sử dụng: bash push-to-github.sh YOUR_GITHUB_USERNAME

if [ -z "$1" ]; then
  echo "❌ Cần GitHub username!"
  echo "Sử dụng: bash push-to-github.sh YOUR_GITHUB_USERNAME"
  exit 1
fi

USERNAME=$1

echo "🚀 Pushing to GitHub..."
git remote add origin https://github.com/$USERNAME/kimi-k2.5-worker.git
git branch -M main
git push -u origin main

echo "✅ Done! Repo của bạn:"
echo "https://github.com/$USERNAME/kimi-k2.5-worker"
