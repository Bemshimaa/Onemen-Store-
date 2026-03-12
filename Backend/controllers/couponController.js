const asyncHandler = require('express-async-handler');
const Coupon = require('../models/couponModel');

// @desc    Validate a promo code
// @route   POST /api/coupons/validate
// @access  Private
const validateCoupon = asyncHandler(async (req, res) => {
  const { code } = req.body;

  const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

  if (coupon) {
    const isExpired = new Date() > coupon.expiry;

    if (isExpired) {
      res.status(400);
      throw new Error('Coupon has expired');
    }

    res.json({
      code: coupon.code,
      discount: coupon.discount,
    });
  } else {
    res.status(404);
    throw new Error('Invalid promo code');
  }
});

// @desc    Create a coupon (Admin only - for testing)
// @route   POST /api/coupons
// @access  Private
const createCoupon = asyncHandler(async (req, res) => {
    const { code, discount, expiryDays } = req.body;
    
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + (expiryDays || 30));

    const coupon = new Coupon({
        code,
        discount,
        expiry
    });

    const createdCoupon = await coupon.save();
    res.status(201).json(createdCoupon);
});

module.exports = {
  validateCoupon,
  createCoupon
};
