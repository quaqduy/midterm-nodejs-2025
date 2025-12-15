# Node.js + TypeScript Backend Base

Một **base project** cho backend Node.js sử dụng **TypeScript** và **Express**, hỗ trợ cấu hình môi trường, script chạy dev/build, và dễ mở rộng.

---

## **Cấu trúc project**

```text
nodejs-base-backend/
├─ src/
│  ├─ app.ts          # Khởi tạo Express app, middleware, routes
│  ├─ server.ts       # Entry point, lắng nghe port
│  └─ config/
│     └─ env.ts       # Cấu hình môi trường
├─ dist/              # Code JS build ra
├─ package.json
├─ tsconfig.json
└─ .gitignore


# Clone project
git clone <repo-url>
cd nodejs-base-backend

# Cài dependencies
npm install

# Tạo file .env nếu muốn custom port
echo "PORT=3000" > .env
