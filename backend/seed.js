const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('./models/Product');

dotenv.config({ path: path.join(__dirname, '.env') });

const products = [
    {
        id: 1,
        name: "Red & White tee",
        price: "N27,000",
        image: "/src/assets/IMAGES/product-card-1.jpg",
        description: "Rep ONEMEN in a vintage-inspired top. Dropped shoulders and a baggy fit keep it relaxed and casual, while heavyweight cotton fabric adds a structured feel.",
        color: "white",
        sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 2,
        name: "Short Sleeve Polo",
        price: "N27,000",
        image: "/src/assets/IMAGES/product-card-2.jpg",
        description: "Rep ONEMEN in a vintage-inspired top. Dropped shoulders and a baggy fit keep it relaxed and casual, while heavyweight cotton fabric adds a structured feel.",
        color: "black",
        sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 3,
        name: "Onemen Jersey",
        price: "N27,000",
        image: "/src/assets/IMAGES/Product-card-3.jpg",
        description: "Rep ONEMEN in a vintage-inspired top. Dropped shoulders and a baggy fit keep it relaxed and casual, while heavyweight cotton fabric adds a structured feel.",
        color: "green",
        sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 4,
        name: "Receipt Tee",
        price: "N27,000",
        image: "/src/assets/IMAGES/Product-card-4.jpg",
        description: "Rep ONEMEN in a vintage-inspired top. Dropped shoulders and a baggy fit keep it relaxed and casual, while heavyweight cotton fabric adds a structured feel.",
        color: "white",
        sizes: ["S", "M", "L", "XL"],
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding...');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products.');

        // Insert new products
        await Product.insertMany(products);
        console.log(`Seeded ${products.length} products successfully!`);

        await mongoose.connection.close();
        console.log('Database connection closed.');
        process.exit(0);
    } catch (error) {
        console.error(`Seed error: ${error.message}`);
        process.exit(1);
    }
};

seedDB();
