# NodeJS Testing Demo

## Cài đặt
```bash
npm install

## Chạy
# Development mode với hot reload
npm run dev

# Production mode
npm start

# Build TypeScript
npm run build

## Tests
# TẤT CẢ tests
npm test

# Chỉ chạy UNIT TESTS
npm test -- tests/app.test.ts

# Chỉ chạy INTEGRATION TESTS
npm test -- tests/app.integration.test.ts

# Chỉ chạy E2E TESTS (flow test)
npm test -- tests/e2e-flow.test.ts

# Chạy test với WATCH mode (tự động chạy lại khi thay đổi code)
npm run test:watch

# Chạy test với COVERAGE report
npm run test:coverage

# Chạy E2E với Puppeteer (nếu có)
npm run test:e2e