// src/config/env.js
require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    sessionSecret: process.env.SESSION_SECRET || 'testing-secret'
};