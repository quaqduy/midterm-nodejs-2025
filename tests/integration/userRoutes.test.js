const request = require('supertest');
const app = require('../../src/app');

describe('User Routes - Integration Tests', () => {
    let createdUserId;

    // Test API Endpoints
    describe('API Endpoints', () => {
        describe('GET /api/users', () => {
            it('should return all users with 200 status', async () => {
                const response = await request(app)
                    .get('/api/users')
                    .expect('Content-Type', /json/)
                    .expect(200);

                expect(response.body.success).toBe(true);
                expect(response.body.data).toBeInstanceOf(Array);
                expect(response.body.count).toBeGreaterThanOrEqual(0);
            });
        });

        describe('POST /api/users', () => {
            it('should create a new user successfully', async () => {
                const userData = {
                    name: 'Integration Test User',
                    email: 'integration@test.com',
                    age: 29
                };

                const response = await request(app)
                    .post('/api/users')
                    .send(userData)
                    .expect('Content-Type', /json/)
                    .expect(201);

                expect(response.body.success).toBe(true);
                expect(response.body.message).toBe('User created successfully');
                expect(response.body.data).toMatchObject({
                    name: userData.name,
                    email: userData.email,
                    age: userData.age
                });

                createdUserId = response.body.data.id;
            });

            it('should return 400 for missing required fields', async () => {
                const response = await request(app)
                    .post('/api/users')
                    .send({ email: 'test@example.com' })
                    .expect(400);

                expect(response.body.success).toBe(false);
                expect(response.body.message).toBe('Validation failed');
            });

            it('should return 400 for invalid email', async () => {
                const response = await request(app)
                    .post('/api/users')
                    .send({
                        name: 'Test',
                        email: 'invalid-email'
                    })
                    .expect(400);

                expect(response.body.success).toBe(false);
                expect(response.body.message).toBe('Invalid email format');
            });

            it('should return 400 for duplicate email', async () => {
                const userData = {
                    name: 'Duplicate Test',
                    email: 'duplicate@test.com'
                };

                // Create first user
                await request(app)
                    .post('/api/users')
                    .send(userData)
                    .expect(201);

                // Try to create duplicate
                const response = await request(app)
                    .post('/api/users')
                    .send(userData)
                    .expect(400);

                expect(response.body.success).toBe(false);
                expect(response.body.message).toBe('Email already exists');
            });
        });

        describe('GET /api/users/:id', () => {
            it('should return user by ID', async () => {
                const response = await request(app)
                    .get(`/api/users/${createdUserId}`)
                    .expect(200);

                expect(response.body.success).toBe(true);
                expect(response.body.data.id).toBe(createdUserId);
            });

            it('should return 404 for non-existent user', async () => {
                const response = await request(app)
                    .get('/api/users/999999')
                    .expect(404);

                expect(response.body.success).toBe(false);
                expect(response.body.message).toBe('User not found');
            });

            it('should return 400 for missing required fields', async () => {
                const response = await request(app)
                    .post('/api/users')
                    .send({ email: 'test@example.com' });

                expect(response.statusCode).toBe(400);
                expect(response.body.success).toBe(false);
                // Kiểm tra message hoặc errors
                expect(response.body.message).toBeDefined();
            });

            it('should handle invalid ID format', async () => {
                const response = await request(app)
                    .get('/api/users/invalid-id');

                // Chấp nhận cả 400 hoặc 404
                expect([400, 404]).toContain(response.status);
                expect(response.body.success).toBe(false);
            });
        });

        describe('PUT /api/users/:id', () => {
            it('should update user successfully', async () => {
                const updateData = {
                    name: 'Updated Integration User',
                    email: 'updated@integration.com'
                };

                const response = await request(app)
                    .put(`/api/users/${createdUserId}`)
                    .send(updateData)
                    .expect(200);

                expect(response.body.success).toBe(true);
                expect(response.body.message).toBe('User updated successfully');
                expect(response.body.data.name).toBe(updateData.name);
                expect(response.body.data.updatedAt).toBeDefined();
            });

            it('should return 404 when updating non-existent user', async () => {
                const response = await request(app)
                    .put('/api/users/999999')
                    .send({ name: 'Updated' })
                    .expect(404);

                expect(response.body.success).toBe(false);
            });
        });

        describe('DELETE /api/users/:id', () => {
            it('should delete user successfully', async () => {
                const response = await request(app)
                    .delete(`/api/users/${createdUserId}`)
                    .expect(200);

                expect(response.body.success).toBe(true);
                expect(response.body.message).toBe('User deleted successfully');
            });

            it('should return 404 when deleting non-existent user', async () => {
                const response = await request(app)
                    .delete('/api/users/999999')
                    .expect(404);

                expect(response.body.success).toBe(false);
            });
        });
    });

    // Test View Routes
    describe('View Routes', () => {
        describe('GET /users', () => {
            it('should render users page with 200 status', async () => {
                const response = await request(app)
                    .get('/users')
                    .expect('Content-Type', /html/)
                    .expect(200);

                expect(response.text).toContain('Users Management');
                expect(response.text).toContain('Users List');
            });
        });

        describe('GET /users/create', () => {
            it('should render create user page', async () => {
                const response = await request(app)
                    .get('/users/create')
                    .expect(200);

                expect(response.text).toContain('Create New User');
                expect(response.text).toContain('<form');
            });
        });

        describe('GET / (home)', () => {
            it('should render home page', async () => {
                const response = await request(app)
                    .get('/')
                    .expect(200);

                expect(response.text).toContain('Node.js Testing Project');
                expect(response.text).toContain('Unit Testing');
                expect(response.text).toContain('Integration Testing');
            });
        });

        describe('POST /users (form submission)', () => {
            it('should create user via form and redirect', async () => {
                const userData = {
                    name: 'Form Test User',
                    email: 'form@test.com',
                    age: '35'
                };

                const response = await request(app)
                    .post('/users')
                    .send(userData)
                    .expect(302); // Redirect

                expect(response.headers.location).toBe('/users');
            });

            it('should show error for invalid form data', async () => {
                const response = await request(app)
                    .post('/users')
                    .send({ email: 'test@example.com' }) // Missing name
                    .expect(200);

                expect(response.text).toContain('Name and email are required');
            });
        });
    });

    // Test Other Routes
    describe('Other Routes', () => {
        describe('GET /health', () => {
            it('should return health status', async () => {
                const response = await request(app)
                    .get('/health')
                    .expect('Content-Type', /json/)
                    .expect(200);

                expect(response.body.status).toBe('ok');
                expect(response.body.timestamp).toBeDefined();
                expect(response.body.environment).toBeDefined();
            });
        });

        describe('GET /api', () => {
            it('should return API documentation', async () => {
                const response = await request(app)
                    .get('/api')
                    .expect(200);

                expect(response.body.name).toBe('User Management API');
                expect(response.body.endpoints).toBeInstanceOf(Array);
            });
        });

        describe('404 handling', () => {
            it('should return 404 for non-existent routes', async () => {
                await request(app)
                    .get('/non-existent-route')
                    .expect(404);
            });
        });
    });

    // Test Complete CRUD Flow
    describe('Complete CRUD Flow', () => {
        let flowUserId;

        it('should complete full CRUD cycle', async () => {
            // 1. CREATE
            const createRes = await request(app)
                .post('/api/users')
                .send({
                    name: 'Flow Test',
                    email: 'flow@test.com',
                    age: 40
                });

            expect(createRes.status).toBe(201);
            flowUserId = createRes.body.data.id;

            // 2. READ (all)
            const allRes = await request(app).get('/api/users');
            expect(allRes.status).toBe(200);
            const userExists = allRes.body.data.some(u => u.id === flowUserId);
            expect(userExists).toBe(true);

            // 3. READ (single)
            const singleRes = await request(app).get(`/api/users/${flowUserId}`);
            expect(singleRes.status).toBe(200);
            expect(singleRes.body.data.email).toBe('flow@test.com');

            // 4. UPDATE
            const updateRes = await request(app)
                .put(`/api/users/${flowUserId}`)
                .send({ name: 'Flow Test Updated' });
            expect(updateRes.status).toBe(200);
            expect(updateRes.body.data.name).toBe('Flow Test Updated');

            // 5. DELETE
            const deleteRes = await request(app).delete(`/api/users/${flowUserId}`);
            expect(deleteRes.status).toBe(200);

            // 6. Verify deletion
            const verifyRes = await request(app).get(`/api/users/${flowUserId}`);
            expect(verifyRes.status).toBe(404);
        });
    });
});