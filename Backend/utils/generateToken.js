const jwt = require('jsonwebtoken'); // import jsonwebtoken library to sign tokens

module.exports = function generateToken(id) { // export a function that creates a JWT for a given user id
    return jwt.sign( // create signed token
        { id }, // payload: include user id (smallest identifying info needed)
        process.env.JWT_SECRET || 'change-this-secret', // secret key used to sign; must be kept private (use .env in production)
        { expiresIn: '30d', } // token expiry: 30 days (reduces risk if leaked)
    );
};