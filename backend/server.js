const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Basic Route
app.get('/', (req, res) => {
    res.send('OneMen Store API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
