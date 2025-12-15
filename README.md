# Node.js Testing Project

A complete demonstration of testing methodologies in Node.js for the Web Programming with NodeJS course.

## 📋 Project Overview

This project demonstrates comprehensive testing strategies for a Node.js web application, including Unit Tests, Integration Tests, and End-to-End (E2E) tests.

## 🚀 Features

- **Complete CRUD Operations** for User Management
- **RESTful API** with JSON responses
- **Web Interface** with EJS templates
- **Comprehensive Testing Suite**
  - Unit Tests (isolated function testing)
  - Integration Tests (API endpoint testing)
  - E2E Tests (complete workflow testing)
- **Test Coverage Reporting** with Jest
- **Input Validation** and error handling
- **Responsive Design** with modern CSS

## 🏗️ Project Structure
midterm-nodejs-2025/
├── src/
│ ├── app.js # Express application
│ ├── server.js # Server startup
│ ├── controllers/ # Business logic
│ ├── models/ # Data models
│ ├── routes/ # API routes
│ ├── views/ # EJS templates
│ ├── config/ # Configuration
│ ├── middleware/ # Custom middleware
│ └── utils/ # Helper functions
├── tests/
│ ├── unit/ # Unit tests
│ ├── integration/ # Integration tests
│ └── e2e/ # End-to-end tests
├── public/ # Static assets
└── coverage/ # Test coverage reports

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/quaqduy/midterm-nodejs-2025.git
   cd midterm-nodejs-2025

## Install dependencies
npm install

## Set up environment variables
cp .env.example .env
# Edit .env with your configuration




## Development Mode
npm run dev
# Server runs at: http://localhost:3000

## Production Mode
npm start



## Running Tests

# All Tests
npm test

# Specific Test Types
# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# E2E tests only
npm run test:e2e

# Test with Coverage
npm run coverage

Coverage report will be available in the coverage/ directory.

📊 Test Coverage
The project aims for comprehensive test coverage:

Unit Tests: Test individual functions and modules

Integration Tests: Test API endpoints and database interactions

E2E Tests: Test complete user workflows

Target Coverage: 85%+

🌐 API Endpoints
User Management API
Method	Endpoint	Description
GET	/api/users	Get all users
GET	/api/users/:id	Get user by ID
POST	/api/users	Create new user
PUT	/api/users/:id	Update user
DELETE	/api/users/:id	Delete user
System Endpoints
Method	Endpoint	Description
GET	/health	System health check
GET	/api	API documentation

🖥️ Web Interface
Home Page (/) - Project overview and features

Users List (/users) - View all users

Create User (/users/create) - Create new user form

User Details (/users/:id) - View user details

Edit User (/users/:id/edit) - Edit user form

🔧 Technologies Used
Node.js - Runtime environment

Express.js - Web framework

EJS - Template engine

Jest - Testing framework

Supertest - HTTP assertions

bcryptjs - Password hashing

UUID - Unique identifier generation

📝 Testing Methodology
1. Unit Testing
Tests individual functions in isolation

Mocks external dependencies

Focuses on business logic validation

2. Integration Testing
Tests API endpoints

Verifies database interactions

Tests middleware functionality

3. End-to-End Testing
Tests complete user workflows

Simulates real user scenarios

Tests system as a whole

📁 Important Files
src/app.js - Main Express application

src/server.js - Server startup script

tests/unit/ - Unit test files

tests/integration/ - Integration test files

tests/e2e/ - E2E test files

jest.config.js - Jest configuration

package.json - Project dependencies and scripts

🎯 Learning Objectives
Understand different testing methodologies

Implement comprehensive test suites

Generate and interpret coverage reports

Build a full-stack Node.js application

Follow RESTful API design principles

📄 License
This project is for educational purposes as part of the Web Programming with NodeJS course.