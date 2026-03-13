const express = require('express');
const dotenv = require('dotenv');
// const products = require('./data/products'); // <-- remove this if using DB
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const Product = require('./models/productModel');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const couponRoutes = require('./routes/couponRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

connectDB();

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL?.replace(/\/$/, ""),
    'http://localhost:5173',
    'http://127.0.0.1:5173'
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json()); // <-- ADD this so req.body is parsed for JSON payloads

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send("API is Running...");
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})

