const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const promoteToAdmin = async () => {
  const email = process.argv[2];

  if (!email) {
    console.log('Please provide a user email: node promoteAdmin.js (email)');
    process.exit(1);
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      user.isAdmin = true;
      await user.save();
      console.log(`Success: User ${email} is now an admin.`);
    } else {
      console.log(`Error: User with email ${email} not found.`);
    }
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

promoteToAdmin();
