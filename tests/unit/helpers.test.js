const {
    validateEmail,
    validateRequiredFields,
    sanitizeInput,
    generateRandomNumber,
    formatDate
} = require('../../src/utils/helpers');

describe('Helper Functions - Unit Tests', () => {

    describe('validateEmail', () => {
        it('should return true for valid email', () => {
            expect(validateEmail('test@example.com')).toBe(true);
            expect(validateEmail('user.name@domain.co.uk')).toBe(true);
            expect(validateEmail('test123@sub.domain.com')).toBe(true);
        });

        it('should return false for invalid email', () => {
            expect(validateEmail('invalid-email')).toBe(false);
            expect(validateEmail('@domain.com')).toBe(false);
            expect(validateEmail('test@.com')).toBe(false);
            expect(validateEmail('')).toBe(false);
            expect(validateEmail(null)).toBe(false);
            expect(validateEmail(undefined)).toBe(false);
        });
    });

    describe('validateRequiredFields', () => {
        it('should return empty array when all required fields are present', () => {
            const data = { name: 'John', email: 'john@example.com' };
            const requiredFields = ['name', 'email'];

            const errors = validateRequiredFields(data, requiredFields);
            expect(errors).toEqual([]);
        });

        it('should return array of errors for missing fields', () => {
            const data = { name: 'John' };
            const requiredFields = ['name', 'email', 'age'];

            const errors = validateRequiredFields(data, requiredFields);
            expect(errors).toContain('email is required');
            expect(errors).toContain('age is required');
            expect(errors).toHaveLength(2);
        });

        it('should handle empty strings as missing values', () => {
            const data = { name: '', email: 'john@example.com' };
            const requiredFields = ['name', 'email'];

            const errors = validateRequiredFields(data, requiredFields);
            expect(errors).toContain('name is required');
        });

        it('should handle null/undefined as missing values', () => {
            const data = { name: null, email: undefined };
            const requiredFields = ['name', 'email'];

            const errors = validateRequiredFields(data, requiredFields);
            expect(errors).toContain('name is required');
            expect(errors).toContain('email is required');
        });
    });

    describe('sanitizeInput', () => {
        it('should trim whitespace from strings', () => {
            expect(sanitizeInput('  test  ')).toBe('test');
        });

        it('should remove HTML tags', () => {
            expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
            expect(sanitizeInput('<div>content</div>')).toBe('divcontent/div');
        });

        it('should return non-string values unchanged', () => {
            expect(sanitizeInput(123)).toBe(123);
            expect(sanitizeInput(null)).toBe(null);
            expect(sanitizeInput(undefined)).toBe(undefined);
            expect(sanitizeInput({ key: 'value' })).toEqual({ key: 'value' });
        });

        it('should handle empty strings', () => {
            expect(sanitizeInput('')).toBe('');
        });
    });

    describe('generateRandomNumber', () => {
        it('should generate number within specified range', () => {
            const min = 1;
            const max = 10;

            for (let i = 0; i < 100; i++) {
                const num = generateRandomNumber(min, max);
                expect(num).toBeGreaterThanOrEqual(min);
                expect(num).toBeLessThanOrEqual(max);
            }
        });

        it('should handle same min and max', () => {
            expect(generateRandomNumber(5, 5)).toBe(5);
        });

        it('should handle negative ranges', () => {
            const num = generateRandomNumber(-10, -5);
            expect(num).toBeGreaterThanOrEqual(-10);
            expect(num).toBeLessThanOrEqual(-5);
        });
    });

    describe('formatDate', () => {
        it('should format date string correctly', () => {
            const date = '2023-01-15T10:30:00Z';
            const formatted = formatDate(date);

            expect(typeof formatted).toBe('string');
            expect(formatted.length).toBeGreaterThan(0);
            // Không kiểm tra cụ thể nội dung vì phụ thuộc timezone
        });

        it('should handle Date objects', () => {
            const date = new Date('2023-12-25T18:45:00Z');
            const formatted = formatDate(date);

            expect(typeof formatted).toBe('string');
            expect(formatted.length).toBeGreaterThan(0);
            // Chỉ kiểm tra nó trả về string hợp lệ
        });

        it('should handle timestamps', () => {
            const timestamp = 1673793000000; // 2023-01-15
            const formatted = formatDate(timestamp);

            expect(typeof formatted).toBe('string');
            expect(formatted.length).toBeGreaterThan(0);
        });
    });
});