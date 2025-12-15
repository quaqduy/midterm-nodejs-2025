// tests/unit/userController.test.js
// Mock the User model before importing controller
jest.mock('../../src/models/User');

const userController = require('../../src/controllers/userController');

// Mock bcrypt nếu có
jest.mock('bcryptjs', () => ({
    hash: jest.fn(() => Promise.resolve('mocked-hash'))
}));

describe('User Controller - Unit Tests', () => {
    let mockReq, mockRes;
    let mockUserModel;

    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks();

        // Get the mocked User model
        mockUserModel = require('../../src/models/User');

        // Setup mock implementations
        mockUserModel.findAll.mockReturnValue([
            {
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                age: 25,
                createdAt: '2023-01-01T00:00:00.000Z'
            },
            {
                id: '2',
                name: 'Jane Smith',
                email: 'jane@example.com',
                age: 30,
                createdAt: '2023-01-02T00:00:00.000Z'
            }
        ]);

        mockUserModel.findById.mockImplementation((id) => {
            const users = mockUserModel.findAll();
            return users.find(user => user.id === id);
        });

        mockUserModel.findByEmail.mockImplementation((email) => {
            const users = mockUserModel.findAll();
            return users.find(user => user.email === email);
        });

        mockUserModel.create.mockImplementation((userData) => {
            const newUser = {
                id: '3',
                ...userData,
                createdAt: new Date().toISOString()
            };
            return newUser;
        });

        mockUserModel.update.mockImplementation((id, userData) => {
            const user = {
                id,
                name: 'Updated User',
                email: 'updated@example.com',
                updatedAt: new Date().toISOString(),
                ...userData
            };
            return user;
        });

        mockUserModel.delete.mockReturnValue(true);
        mockUserModel.count.mockReturnValue(2);

        // Mock request and response
        mockReq = {
            params: {},
            body: {},
            session: {}
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            render: jest.fn(),
            redirect: jest.fn()
        };
    });

    describe('getAllUsers', () => {
        it('should return all users with success status', () => {
            userController.getAllUsers(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                count: expect.any(Number),
                data: expect.any(Array)
            });
        });
    });

    describe('getUserById', () => {
        it('should return user when found', () => {
            mockReq.params.id = '1';

            userController.getUserById(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                data: expect.objectContaining({
                    id: '1'
                })
            });
        });

        it('should return 404 when user not found', () => {
            mockUserModel.findById.mockReturnValue(null);
            mockReq.params.id = '999';

            userController.getUserById(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                message: 'User not found'
            });
        });
    });

    describe('createUser', () => {
        it('should create new user successfully', async () => {
            mockReq.body = {
                name: 'New User',
                email: 'new@example.com',
                age: 28
            };

            // Mock findByEmail to return null (email doesn't exist)
            mockUserModel.findByEmail.mockReturnValue(null);

            await userController.createUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'User created successfully',
                data: expect.objectContaining({
                    name: 'New User',
                    email: 'new@example.com'
                })
            });
        });

        it('should return 400 when email already exists', async () => {
            mockReq.body = {
                name: 'Another User',
                email: 'john@example.com' // Already exists
            };

            await userController.createUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: false,
                message: 'Email already exists'
            });
        });
    });

    describe('updateUser', () => {
        it('should update user successfully', async () => {
            mockReq.params.id = '1';
            mockReq.body = {
                name: 'Updated Name',
                email: 'updated@example.com'
            };

            await userController.updateUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'User updated successfully',
                data: expect.objectContaining({
                    id: '1',
                    name: 'Updated Name'
                })
            });
        });

        it('should return 404 when user not found', async () => {
            mockUserModel.findById.mockReturnValue(null);
            mockReq.params.id = '999';
            mockReq.body = { name: 'Updated' };

            await userController.updateUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
        });
    });

    describe('deleteUser', () => {
        it('should delete user successfully', () => {
            mockReq.params.id = '1';

            userController.deleteUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: 'User deleted successfully',
                data: expect.any(Object)
            });
        });

        it('should return 404 when user not found', () => {
            mockUserModel.findById.mockReturnValue(null);
            mockReq.params.id = '999';

            userController.deleteUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
        });
    });

    describe('View rendering methods', () => {
        it('renderUsersPage should render users view', () => {
            userController.renderUsersPage(mockReq, mockRes);

            expect(mockRes.render).toHaveBeenCalledWith('users', {
                title: 'Users List',
                users: expect.any(Array),
                userCount: expect.any(Number)
            });
        });

        it('renderCreatePage should render create view', () => {
            userController.renderCreatePage(mockReq, mockRes);

            expect(mockRes.render).toHaveBeenCalledWith('create', {
                title: 'Create New User',
                error: null,
                formData: {}
            });
        });
    });
});