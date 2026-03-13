const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const connectDB = require('./config/db');

dotenv.config();

const deleteUser = async () => {
    const email = 'ajonbem123@gmail.com';
    try {
        await connectDB();
        console.log(`Searching for user with email: ${email}`);
        
        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (user) {
            await User.deleteOne({ _id: user._id });
            console.log(`SUCCESS: User ${email} has been deleted from the database.`);
        } else {
            console.log(`NOTICE: No user found with email: ${email}. It may have already been deleted or never existed.`);
        }
        
        process.exit();
    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        process.exit(1);
    }
};

deleteUser();
