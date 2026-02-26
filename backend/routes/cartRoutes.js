const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

// GET /api/cart — fetch all cart items (only those with sizes that have quantity > 0)
router.get('/', async (req, res) => {
    try {
        const items = await CartItem.find();
        // Filter out any size entries with quantity <= 0, then exclude items with no sizes left
        const filtered = items
            .map((item) => {
                const obj = item.toObject();
                obj.sizes = obj.sizes.filter((s) => s.quantity > 0);
                return obj;
            })
            .filter((item) => item.sizes.length > 0);
        res.json(filtered);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/cart — add an item/size to the cart
// Body: { productId, name, image, price, size, quantity? }
router.post('/', async (req, res) => {
    const { productId, name, image, price, size, quantity } = req.body;
    const qty = quantity || 1;

    try {
        // Check if the product already exists in the cart
        let cartItem = await CartItem.findOne({ productId });

        if (cartItem) {
            // Product exists — check if this size already exists
            const sizeEntry = cartItem.sizes.find((s) => s.size === size);
            if (sizeEntry) {
                sizeEntry.quantity += qty;
            } else {
                cartItem.sizes.push({ size, quantity: qty });
            }
            const updated = await cartItem.save();
            return res.json(updated);
        }

        // Product doesn't exist in cart — create a new entry
        cartItem = new CartItem({
            productId,
            name,
            image,
            price,
            sizes: [{ size, quantity: qty }],
        });

        const saved = await cartItem.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/cart/:id/size — update quantity of a specific size within a cart item
// Body: { size, quantity }
router.put('/:id/size', async (req, res) => {
    try {
        const item = await CartItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        const { size, quantity } = req.body;
        const sizeEntry = item.sizes.find((s) => s.size === size);

        if (!sizeEntry) {
            return res.status(404).json({ message: `Size "${size}" not found in this cart item` });
        }

        if (quantity <= 0) {
            // Remove the size entry
            item.sizes = item.sizes.filter((s) => s.size !== size);

            // If no sizes left, remove the entire cart item
            if (item.sizes.length === 0) {
                await item.deleteOne();
                return res.json({ removed: true, _id: req.params.id });
            }
        } else {
            sizeEntry.quantity = quantity;
        }

        const updated = await item.save();
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/cart/:id/size/:size — remove a specific size from a cart item
router.delete('/:id/size/:size', async (req, res) => {
    try {
        const item = await CartItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        item.sizes = item.sizes.filter((s) => s.size !== req.params.size);

        // If no sizes left, remove the entire cart item
        if (item.sizes.length === 0) {
            await item.deleteOne();
            return res.json({ removed: true, _id: req.params.id });
        }

        const updated = await item.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/cart/:id — remove an entire product from the cart
router.delete('/:id', async (req, res) => {
    try {
        const item = await CartItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        await item.deleteOne();
        res.json({ removed: true, _id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
