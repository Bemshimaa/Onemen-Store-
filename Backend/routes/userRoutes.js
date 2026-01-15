const express = require('express'); // import Express to create a router
const router = express.Router(); // create a router instance to define route handlers
const { registerUser, authUser, getUserProfile } = require('../controllers/userController'); // import controller functions
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser); // POST /api/users/register -> registerUser handler
router.post('/login', authUser); // POST /api/users/login -> authUser handler
router.get('/profile', protect, getUserProfile); // GET /api/users/profile -> protected route returning user profile

module.exports = router; // export router to be mounted in server.js