const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');

dotenv.config();

const makeTeamAdmins = async () => {
    const emails = [
        'atayerop@gmail.com',
        'ogbuiyimunachi@gmail.com',
        'reaganjerry229@gmail.com'
    ];
    
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected!');
        
        for (const email of emails) {
            console.log(`Searching for team member: ${email}`);
            const user = await User.findOne({ email: email.toLowerCase() });
            
            if (user) {
                user.isAdmin = true;
                await user.save();
                console.log(`SUCCESS: ${email} has been promoted to ADMIN.`);
            } else {
                console.log(`NOTICE: No user found with email: ${email}. Tell them to register on onemen.store first!`);
            }
        }
        
        console.log('Finished processing.');
        process.exit();
    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        process.exit(1);
    }
};

makeTeamAdmins();
