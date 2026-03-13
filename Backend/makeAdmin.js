const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const connectDB = require('./config/db');

dotenv.config();

const makeAdmin = async () => {
    const email = 'ajonbem123@gmail.com';
    try {
        await connectDB();
        console.log(`Searching for user with email: ${email}`);
        
        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (user) {
            user.isAdmin = true;
            await user.save();
            console.log(`SUCCESS: User ${email} has been promoted to ADMIN.`);
        } else {
            console.log(`ERROR: No user found with email: ${email}. Please ensure you have registered correctly.`);
        }
        
        process.exit();
    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        process.exit(1);
    }
};

makeAdmin();
