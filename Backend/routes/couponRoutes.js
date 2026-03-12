const express = require('express');
const router = express.Router();
const { validateCoupon, createCoupon } = require('../controllers/couponController');
const { protect } = require('../middleware/authMiddleware');

// In a real app, createCoupon would be protected by both protect AND an admin middleware
router.post('/validate', protect, validateCoupon);
router.post('/', protect, createCoupon);

module.exports = router;
