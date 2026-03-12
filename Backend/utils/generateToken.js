const jwt = require('jsonwebtoken'); // Get the wristband machine

module.exports = function generateToken(id) { // export a function that creates a JWT for a given user id, ID is the User's unique number
    return jwt.sign( // create signed token
        //Argment A: The Payload
        { id }, // payload: include user id (smallest identifying info needed) on the band
        //Argument B: The Secret 
        process.env.JWT_SECRET || 'change-this-secret', // secret key used to sign; must be kept private (use .env in production)
        //Argument C: The Expiration
        { expiresIn: '30d', } // token expiry: 30 days (reduces risk if leaked)
    );
};