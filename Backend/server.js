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

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
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

