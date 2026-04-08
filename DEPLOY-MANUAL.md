# Hướng dẫn Deploy qua Cloudflare Dashboard

## Bước 1: Truy cập Cloudflare Dashboard

1. Mở browser và truy cập: https://dash.cloudflare.com/
2. Đăng nhập vào tài khoản Cloudflare của bạn
3. Chọn **Workers & Pages** từ menu bên trái

## Bước 2: Tạo Worker mới

1. Click nút **Create** hoặc **Create Application**
2. Chọn **Create Worker**
3. Đặt tên: `kimi-k2-5-worker` (hoặc tên bạn muốn)
4. Click **Deploy**

## Bước 3: Copy code vào Worker

1. Sau khi deploy, click **Edit Code**
2. Xóa toàn bộ code mẫu
3. Copy toàn bộ nội dung file `src/index.ts` (đã có sẵn trong project)
4. Paste vào editor
5. Click **Save and Deploy**

## Bước 4: Cấu hình AI Binding

1. Quay lại trang Worker settings
2. Chọn tab **Settings** > **Variables**
3. Scroll xuống phần **Workers AI**
4. Click **Add binding**
5. Variable name: `AI`
6. Click **Save**

## Bước 5: Test Worker

URL của worker sẽ có dạng:
```
https://kimi-k2-5-worker.YOUR-SUBDOMAIN.workers.dev
```

Test bằng curl:
```bash
curl https://kimi-k2-5-worker.YOUR-SUBDOMAIN.workers.dev/health
```

Hoặc mở trực tiếp trong browser!

---

## Lưu ý

- Workers AI binding tự động có sẵn, không cần API key
- Free tier: 10,000 neurons/day
- Sau đó tính phí theo usage
