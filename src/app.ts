import express from 'express';

const app = express();

// Middleware
app.use(express.json());

// Routes example
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

export default app;
