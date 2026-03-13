const asyncHandler = require('express-async-handler'); // import helper that wraps async route handlers and forwards errors to Express error middleware
const User = require('../models/userModel'); // import the Mongoose User model to query/create users
const generateToken = require('../utils/generateToken'); // import JWT helper to create auth tokens

const registerUser = asyncHandler(async (req, res) => { // define an async route handler wrapped by asyncHandler
    const { name, email, password } = req.body; // extract expected fields from the request body (sent by client)
    
    console.log(`Register attempt for email: ${email}`);

    const userExists = await User.findOne({ email: email.toLowerCase() }); // check DB for an existing user with same email
    if (userExists) {
        console.warn(`Registration failed: User already exists - ${email}`);
        res.status(400); // set HTTP 400 Bad Request status
        throw new Error('User already exists'); // throw error -> caught by asyncHandler -> goes to error middleware
    }
    
    const user = await User.create({ name, email: email.toLowerCase(), password }); // create new user document
    if (user) {
        console.log(`User created successfully: ${user.email}`);
        res.status(201).json({ // on success, respond 201 Created with user info and token
            _id: user._id, // MongoDB document id
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id), // issue JWT so client can authenticate subsequent requests
        });
    } else {
        console.error('Registration failed: Invalid user data');
        res.status(400); // creation failed (invalid input/database issue)
        throw new Error('Invalid user data'); // surface error to client via error middleware
    }
});

const authUser = asyncHandler(async (req, res) => { // login handler
    const { email, password } = req.body; // get credentials from client
    
    console.log(`Login attempt for email: ${email}`);

    const user = await User.findOne({ email: email.toLowerCase() }); // find user by email
    
    if (user) {
        console.log(`User found: ${user.email}. Checking password...`);
        if (await user.matchPassword(password)) {
            console.log(`Password match successful for ${user.email}`);
            res.json({ // respond 200 OK (default) with user info + token
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id), // fresh token for client
            });
            return;
        } else {
            console.warn(`Password mismatch for ${user.email}`);
        }
    } else {
        console.warn(`No user found with email: ${email}`);
    }

    res.status(401); // Unauthorized
    throw new Error('Invalid email or password'); // error handled by global error middleware
});

const getUserProfile = asyncHandler(async (req, res) => {
    // `protect` middleware sets `req.user` to the authenticated user (without password)
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = { registerUser, authUser, getUserProfile }; // export handlers so routes can import them