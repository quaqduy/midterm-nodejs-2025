// src/app.js
const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const config = require('./config/env');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', userRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Node.js Testing Project',
        currentYear: new Date().getFullYear()
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv,
        uptime: process.uptime()
    });
});

// API documentation
app.get('/api', (req, res) => {
    res.json({
        name: 'User Management API',
        version: '1.0.0',
        endpoints: [
            {
                method: 'GET',
                path: '/api/users',
                description: 'Get all users'
            },
            {
                method: 'GET',
                path: '/api/users/:id',
                description: 'Get user by ID'
            },
            {
                method: 'POST',
                path: '/api/users',
                description: 'Create new user'
            },
            {
                method: 'PUT',
                path: '/api/users/:id',
                description: 'Update user'
            },
            {
                method: 'DELETE',
                path: '/api/users/:id',
                description: 'Delete user'
            }
        ]
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('error', {
        title: '404 - Not Found',
        message: 'The page you are looking for does not exist.'
    });
});

// Error handler
// src/app.js - sửa error handler
app.use((err, req, res, next) => {
    // Chỉ log error trong development mode
    if (process.env.NODE_ENV !== 'test') {
        console.error('Error:', err);
    }

    res.status(err.status || 500).render('error', {
        title: 'Server Error',
        message: process.env.NODE_ENV === 'development'
            ? err.message
            : 'An unexpected error occurred. Please try again later.'
    });
});

module.exports = app;