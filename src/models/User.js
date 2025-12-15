// src/models/User.js
// Không dùng UUID, dùng simple counter

let currentId = 2; // Bắt đầu từ 2 vì đã có 2 users mẫu

// In-memory database (cho mục đích demo)
class InMemoryDatabase {
    constructor() {
        this.reset();
    }

    // Lấy tất cả users
    findAll() {
        return [...this.users]; // Return copy để không bị mutate
    }

    // Tìm user theo ID
    findById(id) {
        return this.users.find(user => user.id === id);
    }

    // Tạo user mới
    create(userData) {
        currentId++;
        const newUser = {
            id: currentId.toString(),
            ...userData,
            createdAt: new Date().toISOString()
        };
        this.users.push(newUser);
        return newUser;
    }

    // Cập nhật user
    update(id, userData) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) return null;

        this.users[index] = {
            ...this.users[index],
            ...userData,
            updatedAt: new Date().toISOString()
        };
        return this.users[index];
    }

    // Xóa user
    delete(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) return false;

        this.users.splice(index, 1);
        return true;
    }

    // Tìm user theo email
    findByEmail(email) {
        return this.users.find(user => user.email === email);
    }

    // Get user count
    count() {
        return this.users.length;
    }

    // Reset database (dùng cho testing)
    reset() {
        this.users = [
            {
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                age: 25,
                createdAt: new Date('2023-01-01T00:00:00.000Z').toISOString()
            },
            {
                id: '2',
                name: 'Jane Smith',
                email: 'jane@example.com',
                age: 30,
                createdAt: new Date('2023-01-02T00:00:00.000Z').toISOString()
            }
        ];
        currentId = 2;
    }
}

module.exports = new InMemoryDatabase();