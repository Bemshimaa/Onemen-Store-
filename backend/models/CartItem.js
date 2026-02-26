const mongoose = require('mongoose');

const sizeEntrySchema = new mongoose.Schema({
    size: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
    },
}, { _id: false });

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    sizes: {
        type: [sizeEntrySchema],
        required: true,
        validate: {
            validator: (v) => v.length > 0,
            message: 'Cart item must have at least one size entry.',
        },
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('CartItem', cartItemSchema);
