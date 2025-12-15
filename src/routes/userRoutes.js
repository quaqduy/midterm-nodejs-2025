// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validation = require('../middleware/validation');

// API Routes
router.get('/api/users', userController.getAllUsers);
router.get('/api/users/:id', validation.validateIdParam, userController.getUserById);
router.post('/api/users', validation.validateCreateUser, userController.createUser);
router.put('/api/users/:id', validation.validateIdParam, validation.validateUpdateUser, userController.updateUser);
router.delete('/api/users/:id', validation.validateIdParam, userController.deleteUser);

// View Routes
router.get('/users', userController.renderUsersPage);
router.get('/users/create', userController.renderCreatePage);
router.get('/users/:id', validation.validateIdParam, userController.renderUserDetailPage);
router.get('/users/:id/edit', validation.validateIdParam, userController.renderEditPage);
router.post('/users', userController.handleCreateUser);
router.post('/users/:id/update', validation.validateIdParam, userController.handleUpdateUser);
router.post('/users/:id/delete', validation.validateIdParam, userController.handleDeleteUser);

module.exports = router;