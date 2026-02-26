const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products — fetch all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ id: 1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/products/:id — fetch a single product by its numeric id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: Number(req.params.id) });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
