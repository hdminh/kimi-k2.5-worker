# Hướng dẫn Upload lên GitHub

## Cách 1: Tạo repo mới trên GitHub (Khuyên dùng)

### Bước 1: Tạo repo trên GitHub
1. Truy cập: https://github.com/new
2. Repository name: `kimi-k2.5-worker`
3. Description: `Cloudflare Worker for Kimi K2.5 AI model - 256k context, function calling, streaming`
4. Chọn **Public** hoặc **Private**
5. **KHÔNG** chọn "Add a README file"
6. Click **Create repository**

### Bước 2: Push code lên GitHub

Chạy các lệnh sau trong terminal (từ thư mục `kimi-worker`):

```bash
cd kimi-worker

# Khởi tạo git (nếu chưa có)
git init

# Add tất cả files
git add .

# Commit
git commit -m "Initial commit: Kimi K2.5 Cloudflare Worker"

# Add remote (thay YOUR_USERNAME bằng username GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/kimi-k2.5-worker.git

# Push lên GitHub
git branch -M main
git push -u origin main
```

### Bước 3: Xong!

Repo của bạn sẽ có tại:
```
https://github.com/YOUR_USERNAME/kimi-k2.5-worker
```

---

## Cách 2: Upload file zip

### Bước 1: Tạo zip file

```bash
cd kimi-worker
zip -r kimi-k2.5-worker.zip . -x "node_modules/*" -x ".git/*"
```

### Bước 2: Upload lên GitHub
1. Tạo repo mới như Cách 1
2. Click **uploading an existing file**
3. Kéo thả file zip hoặc chọn file
4. Commit changes

---

## Cách 3: Dùng GitHub CLI (Nhanh nhất nếu đã setup)

```bash
cd kimi-worker

# Login GitHub (nếu chưa)
gh auth login

# Tạo repo và push
gh repo create kimi-k2.5-worker --public --source=. --push

# Hoặc private:
gh repo create kimi-k2.5-worker --private --source=. --push
```

---

## Files trong repo

```
kimi-k2.5-worker/
├── README.md              # Hướng dẫn tổng quan
├── DEPLOY.md              # Hướng dẫn deploy
├── DEPLOY-MANUAL.md       # Deploy qua dashboard
├── EXAMPLES.md            # 12 ví dụ sử dụng
├── SUMMARY.md             # Tóm tắt
├── src/
│   └── index.ts          # Worker code
├── client.ts              # TypeScript client
├── client.py              # Python client
├── test.js                # Test script
├── demo.html              # Web UI demo
├── deploy.sh              # Deploy script
├── package.json           # Dependencies
├── wrangler.toml          # Cloudflare config
├── tsconfig.json          # TypeScript config
└── .gitignore             # Git ignore
```

## Sau khi upload

Thêm badge vào README.md:

```markdown
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/YOUR_USERNAME/kimi-k2.5-worker)
```

Repo sẽ có nút "Deploy to Cloudflare Workers" để người khác dễ dàng deploy!
