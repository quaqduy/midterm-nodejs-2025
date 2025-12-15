/**
 * E2E Test với Puppeteer
 * Lưu ý: Cần chạy server trước khi test
 */

describe('E2E Tests - API Endpoints (using Supertest instead)', () => {
    // Trong thực tế, với thời gian hạn chế, bạn có thể dùng Supertest cho E2E
    // Puppeteer thực sự cần khi test giao diện người dùng
});

// Hoặc nếu vẫn muốn dùng Puppeteer, đây là phiên bản đơn giản:
import puppeteer from 'puppeteer';

describe('Puppeteer Demo - Basic Browser Automation', () => {
    let browser: any;
    let page: any;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true, // 'new' mode hoặc true
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        page = await browser.newPage();
        // Tăng timeout cho Puppeteer
        page.setDefaultTimeout(10000);
    }, 30000); // Tăng timeout cho beforeAll

    afterAll(async () => {
        if (browser) {
            await browser.close();
        }
    });

    test('should take screenshot of Google homepage', async () => {
        await page.goto('https://www.google.com');
        await page.screenshot({ path: 'tests/screenshots/google-home.png' });

        const title = await page.title();
        expect(title).toContain('Google');
    }, 15000);

    test('should demonstrate form interaction', async () => {
        await page.goto('https://example.com');
        const content = await page.content();
        expect(content).toContain('Example Domain');
    }, 15000);
});