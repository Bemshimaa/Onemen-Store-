const express = require('express');
const dotenv = require('dotenv');
const products = require('./data/products');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db')
const Product = require('./models/productModel'); // Import the Product model for DB operations

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send("API is Running...");
});

// Updated route to fetch products from MongoDB instead of static data
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({}); // Fetch all products from DB
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// New route to fetch a single product by ID from MongoDB
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); // Find product by MongoDB _id
        if (product) {
            return res.json(product);
        }
        res.status(404).json({ message: 'Product not found' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})

