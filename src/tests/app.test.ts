import app from '../app';
import request from 'supertest';

describe('Unit Tests for User API', () => {
    describe('GET /api/users', () => {
        it('should return all users with status 200', async () => {
            const res = await request(app).get('/api/users');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
        });
    });

    describe('GET /api/users/:id', () => {
        it('should return user by ID', async () => {
            const res = await request(app).get('/api/users/1');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id', 1);
            expect(res.body).toHaveProperty('name');
        });

        it('should return 404 for non-existent user', async () => {
            const res = await request(app).get('/api/users/999');
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error');
        });
    });

    describe('POST /api/users', () => {
        it('should create new user', async () => {
            const newUser = {
                name: 'Test User',
                email: 'test@example.com'
            };
            const res = await request(app)
                .post('/api/users')
                .send(newUser);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.name).toBe(newUser.name);
        });

        it('should return 400 for invalid input', async () => {
            const res = await request(app)
                .post('/api/users')
                .send({}); // empty body
            expect(res.statusCode).toBe(400);
        });
    });
});