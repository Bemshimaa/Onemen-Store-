const mongoose = require('mongoose');

// 1. Create the Schema (The Blueprint)
const productSchema = mongoose.Schema(
  {
    // Define each field and its rules
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: String, // Or Number, depending on how you store "N27,000"
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    // 2. Options
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// 3. Create the Model from the Schema
const Product = mongoose.model('Product', productSchema);

// 4. Export it
module.exports = Product;