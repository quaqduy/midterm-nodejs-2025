import express from 'express';

const app = express();

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Home
app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

// API endpoints cho testing demo
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// GET all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

// POST new user
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;

    // Kiểm tra dữ liệu bắt buộc
    if (!name || !email) {
        return res.status(400).json({
            error: 'Thiếu thông tin bắt buộc',
            message: 'Cần cung cấp đầy đủ name và email'
        });
    }

    // Kiểm tra định dạng email đơn giản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: 'Email không hợp lệ'
        });
    }

    // Nếu dữ liệu hợp lệ, tạo user mới
    const newUser = {
        id: users.length + 1,
        name: name,
        email: email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

export default app;