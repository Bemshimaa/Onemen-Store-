const mongoose = require('mongoose');
const dotenv = require('dotenv');
const products = require('./data/products'); 
const Product = require('./models/productModel'); 
const connectDB = require('./config/db'); 

dotenv.config();

const runSeeder = async () => {
    try {
        await connectDB(); 

        if (process.argv[2] === '-d') {
            await destroyData();
        } else {
            await importData();
        }
        
    } catch (error) {
        console.error(`Seeder Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await Product.deleteMany();
        
        // Note: If your products array doesn't have 'brand', 
        // ensure it's not required in the model or add it here.
        await Product.insertMany(products);
        
        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error with Import: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
  try {
    await Product.deleteMany(); 
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error with Destroy: ${error.message}`);
    process.exit(1);
  }
};

runSeeder();