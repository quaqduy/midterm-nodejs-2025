// src/server.js
const app = require('./app');
const config = require('./config/env');

const PORT = config.port;

const server = app.listen(PORT, () => {
    console.log(`
    🚀 Server is running!
    📍 Local: http://localhost:${PORT}
    🌍 Environment: ${config.nodeEnv}
    
    📊 API Endpoints:
    - GET  /api/users     - Get all users
    - POST /api/users     - Create user
    - GET  /api/users/:id - Get user by ID
    - PUT  /api/users/:id - Update user
    - DELETE /api/users/:id - Delete user
    
    👁️  Views:
    - /              - Home page
    - /users         - Users list
    - /users/create  - Create user form
    - /users/:id     - User details
    - /users/:id/edit - Edit user
    
    🔧 Health Check:
    - /health        - Health status
    - /api          - API documentation
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});

module.exports = server;