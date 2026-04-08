# 🚀 HƯỚNG DẪN UPLOAD LÊN GITHUB - ĐƠN GIẢN NHẤT

## Cách 1: Thủ công qua GitHub Web (5 phút)

### Bước 1: Tạo repo mới
1. Mở: https://github.com/new
2. Repository name: `kimi-k2.5-worker`
3. Description: `Cloudflare Worker for Kimi K2.5 AI model`
4. Chọn **Public**
5. Click **Create repository**

### Bước 2: Upload files
1. Trên trang repo vừa tạo, click **uploading an existing file**
2. Kéo thả toàn bộ files từ thư mục `kimi-worker/` (trừ `node_modules/`)
3. Hoặc click **choose your files** và chọn tất cả
4. Commit message: `Initial commit`
5. Click **Commit changes**

### Xong! 🎉

---

## Cách 2: Dùng Git CLI (2 phút)

```bash
cd kimi-worker

# Tạo repo trên GitHub trước (https://github.com/new)
# Sau đó chạy (thay YOUR_USERNAME):

git remote add origin https://github.com/YOUR_USERNAME/kimi-k2.5-worker.git
git branch -M main
git push -u origin main
```

Khi push, GitHub sẽ hỏi username/password:
- Username: GitHub username của bạn
- Password: Dùng **Personal Access Token** (không phải password)
  - Tạo token: https://github.com/settings/tokens/new
  - Scope: chọn `repo`

---

## Cách 3: Dùng GitHub CLI (Nhanh nhất nếu đã setup)

```bash
cd kimi-worker

# Login (chỉ cần 1 lần)
gh auth login

# Tạo repo và push
gh repo create kimi-k2.5-worker --public --source=. --push
```

---

## ⚡ Hoặc cho tôi GitHub Token

Nếu bạn có GitHub Personal Access Token, gửi cho tôi và tôi sẽ tạo repo tự động:

```bash
cd kimi-worker
bash quick-deploy.sh YOUR_GITHUB_TOKEN
```

Tạo token tại: https://github.com/settings/tokens/new
- Note: `kimi-worker`
- Scope: `repo` (full control)
- Expiration: 30 days

---

## 📦 Backup

File `kimi-k2.5-worker.tar.gz` (26KB) đã được tạo để backup.

---

Bạn muốn dùng cách nào? Hoặc cần tôi giúp gì thêm?
