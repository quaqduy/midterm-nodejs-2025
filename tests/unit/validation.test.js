const userValidation = require('../../src/middleware/validation');

// Mock request, response, next
const mockRequest = (body = {}, params = {}) => ({
    body,
    params
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = jest.fn();

describe('Validation Middleware - Unit Tests', () => {
    beforeEach(() => {
        mockNext.mockClear();
    });

    describe('validateCreateUser', () => {
        it('should call next() with valid data', () => {
            const req = mockRequest({
                name: 'John Doe',
                email: 'john@example.com'
            });
            const res = mockResponse();

            userValidation.validateCreateUser(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });

        it('should return 400 when name is missing', () => {
            const req = mockRequest({ email: 'john@example.com' });
            const res = mockResponse();

            userValidation.validateCreateUser(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Validation failed',
                errors: ['name is required']
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should return 400 when email is missing', () => {
            const req = mockRequest({ name: 'John Doe' });
            const res = mockResponse();

            userValidation.validateCreateUser(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should return 400 for invalid email format', () => {
            const req = mockRequest({
                name: 'John Doe',
                email: 'invalid-email'
            });
            const res = mockResponse();

            userValidation.validateCreateUser(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Invalid email format'
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should handle multiple validation errors', () => {
            const req = mockRequest({});
            const res = mockResponse();

            userValidation.validateCreateUser(req, res, mockNext);

            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: 'Validation failed'
            }));
        });
    });

    describe('validateUpdateUser', () => {
        it('should call next() with valid email', () => {
            const req = mockRequest({ email: 'updated@example.com' });
            const res = mockResponse();

            userValidation.validateUpdateUser(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });

        it('should call next() when no email is provided', () => {
            const req = mockRequest({ name: 'Updated Name' });
            const res = mockResponse();

            userValidation.validateUpdateUser(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });

        it('should return 400 for invalid email format', () => {
            const req = mockRequest({ email: 'invalid-email' });
            const res = mockResponse();

            userValidation.validateUpdateUser(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Invalid email format'
            });
            expect(mockNext).not.toHaveBeenCalled();
        });
    });

    describe('validateIdParam', () => {
        it('should call next() with valid ID', () => {
            const req = mockRequest({}, { id: '123' });
            const res = mockResponse();

            userValidation.validateIdParam(req, res, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });

        it('should return 400 when ID is missing', () => {
            const req = mockRequest({}, {});
            const res = mockResponse();

            userValidation.validateIdParam(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'User ID is required'
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should return 400 when ID is empty string', () => {
            const req = mockRequest({}, { id: '' });
            const res = mockResponse();

            userValidation.validateIdParam(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(mockNext).not.toHaveBeenCalled();
        });
    });
});