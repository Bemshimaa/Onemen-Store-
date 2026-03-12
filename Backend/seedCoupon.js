const mongoose = require('mongoose');
const path = require('path');
const Coupon = require('./models/couponModel');

async function seed() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/onemen');
    console.log('Connected to MongoDB');

    const coupon = new Coupon({
      code: 'SAVE10',
      discount: 10,
      expiry: new Date('2026-12-31'),
      isActive: true,
    });

    await Coupon.deleteMany({ code: 'SAVE10' });
    await coupon.save();
    console.log('Coupon SAVE10 seeded');
  } catch (error) {
    console.error('Error seeding coupon:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
