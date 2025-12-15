// jest.config.js
module.exports = {
    testEnvironment: 'node',
    testMatch: [
        '<rootDir>/tests/**/*.test.js',
        '<rootDir>/tests/**/*.spec.js'
    ],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    verbose: true,
    testTimeout: 10000
};