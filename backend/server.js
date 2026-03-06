const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customers');

dotenv.config();

const app = express();

/* Middlewares */
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://churn-ai-platform.vercel.app"
    ],
    credentials: true
}));

app.use(express.json());

/* Health Check Route */
app.get('/', (req, res) => {
    res.json({
        message: 'AI Churn Predictor API is running'
    });
});

/* API Routes */
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

/* PORT */
const PORT = process.env.PORT || 5000;

/* MongoDB Connection */
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {

        console.log('✅ MongoDB Connected');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
    });