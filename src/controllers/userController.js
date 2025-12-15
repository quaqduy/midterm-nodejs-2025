// src/controllers/userController.js
const User = require('../models/User');
const { sanitizeInput } = require('../utils/helpers');

const userController = {
    // Lấy tất cả users (API)
    getAllUsers: (req, res) => {
        try {
            const users = User.findAll();
            res.status(200).json({
                success: true,
                count: users.length,
                data: users
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message
            });
        }
    },

    // Lấy user theo ID (API)
    getUserById: (req, res) => {
        try {
            const user = User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message
            });
        }
    },

    // Tạo user mới (API)
    createUser: async (req, res) => {
        try {
            const { name, email, age } = req.body;

            // Check if email already exists
            if (User.findByEmail(email)) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists'
                });
            }

            const userData = {
                name: sanitizeInput(name),
                email: sanitizeInput(email)
            };

            if (age) userData.age = parseInt(sanitizeInput(age));

            const newUser = User.create(userData);

            res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: newUser
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message
            });
        }
    },

    // Cập nhật user (API)
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, age } = req.body;

            // Check if user exists
            const existingUser = User.findById(id);
            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // If email is being changed, check if new email already exists
            if (email && email !== existingUser.email && User.findByEmail(email)) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists'
                });
            }

            const updateData = {};
            if (name) updateData.name = sanitizeInput(name);
            if (email) updateData.email = sanitizeInput(email);
            if (age) updateData.age = parseInt(sanitizeInput(age));

            const updatedUser = User.update(id, updateData);

            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: updatedUser
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message
            });
        }
    },

    // Xóa user (API)
    deleteUser: (req, res) => {
        try {
            const { id } = req.params;

            const user = User.findById(id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            const deleted = User.delete(id);

            res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message
            });
        }
    },

    // Hiển thị trang users (VIEW)
    renderUsersPage: (req, res) => {
        try {
            const users = User.findAll();
            res.render('users', {
                title: 'Users List',
                users,
                userCount: users.length
            });
        } catch (error) {
            res.status(500).render('error', {
                title: 'Error',
                message: 'Failed to load users'
            });
        }
    },

    // Hiển thị trang tạo user (VIEW)
    renderCreatePage: (req, res) => {
        res.render('create', {
            title: 'Create New User',
            error: null,
            formData: {}
        });
    },

    // Hiển thị trang chỉnh sửa user (VIEW)
    renderEditPage: (req, res) => {
        try {
            const user = User.findById(req.params.id);
            if (!user) {
                return res.status(404).render('error', {
                    title: 'Not Found',
                    message: 'User not found'
                });
            }

            res.render('edit', {
                title: 'Edit User',
                user,
                error: null
            });
        } catch (error) {
            res.status(500).render('error', {
                title: 'Error',
                message: 'Failed to load user'
            });
        }
    },

    // Hiển thị trang chi tiết user (VIEW)
    renderUserDetailPage: (req, res) => {
        try {
            const user = User.findById(req.params.id);
            if (!user) {
                return res.status(404).render('error', {
                    title: 'Not Found',
                    message: 'User not found'
                });
            }

            res.render('detail', {
                title: 'User Details',
                user
            });
        } catch (error) {
            res.status(500).render('error', {
                title: 'Error',
                message: 'Failed to load user details'
            });
        }
    },

    // Xử lý tạo user từ form (VIEW)
    handleCreateUser: async (req, res) => {
        try {
            const { name, email, age } = req.body;

            if (!name || !email) {
                return res.render('create', {
                    title: 'Create New User',
                    error: 'Name and email are required',
                    formData: req.body
                });
            }

            if (User.findByEmail(email)) {
                return res.render('create', {
                    title: 'Create New User',
                    error: 'Email already exists',
                    formData: req.body
                });
            }

            const userData = { name, email };
            if (age) userData.age = parseInt(age);

            const newUser = User.create(userData);

            res.redirect('/users');
        } catch (error) {
            res.render('create', {
                title: 'Create New User',
                error: 'Failed to create user',
                formData: req.body
            });
        }
    },

    // Xử lý cập nhật user từ form (VIEW)
    handleUpdateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, age } = req.body;

            const existingUser = User.findById(id);
            if (!existingUser) {
                return res.status(404).render('error', {
                    title: 'Not Found',
                    message: 'User not found'
                });
            }

            if (email && email !== existingUser.email && User.findByEmail(email)) {
                return res.render('edit', {
                    title: 'Edit User',
                    user: existingUser,
                    error: 'Email already exists'
                });
            }

            const updateData = {};
            if (name) updateData.name = name;
            if (email) updateData.email = email;
            if (age) updateData.age = parseInt(age);

            User.update(id, updateData);

            res.redirect('/users');
        } catch (error) {
            res.render('edit', {
                title: 'Edit User',
                user: req.body,
                error: 'Failed to update user'
            });
        }
    },

    // Xử lý xóa user từ form (VIEW)
    handleDeleteUser: (req, res) => {
        try {
            const { id } = req.params;

            const user = User.findById(id);
            if (!user) {
                return res.status(404).render('error', {
                    title: 'Not Found',
                    message: 'User not found'
                });
            }

            User.delete(id);

            res.redirect('/users');
        } catch (error) {
            res.redirect('/users');
        }
    }
};

module.exports = userController;