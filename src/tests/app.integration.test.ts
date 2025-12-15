import request from 'supertest';
import app from '../app';

describe('Integration Tests - Full Flow', () => {
    let userId: number;

    it('should create, read, and verify user flow', async () => {
        // 1. Create user
        const createRes = await request(app)
            .post('/api/users')
            .send({
                name: 'Integration Test User',
                email: 'integration@test.com'
            });

        expect(createRes.statusCode).toBe(201);
        userId = createRes.body.id;

        // 2. Read all users (should include new user)
        const allRes = await request(app).get('/api/users');
        expect(allRes.statusCode).toBe(200);
        const foundUser = allRes.body.find((u: any) => u.id === userId);
        expect(foundUser).toBeDefined();

        // 3. Read specific user
        const singleRes = await request(app).get(`/api/users/${userId}`);
        expect(singleRes.statusCode).toBe(200);
        expect(singleRes.body.email).toBe('integration@test.com');
    });

    it('should handle health check endpoint', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('timestamp');
    });
});