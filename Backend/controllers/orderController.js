const asyncHandler = require('express-async-handler');
const axios = require('axios');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    discount,
    couponCode,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      discount,
      couponCode,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Verify transaction with Flutterwave
  const transactionId = req.body.id; // Flutterwave uses transaction ID for verification
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
    },
  };

  try {
    const { data } = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      config
    );

    if (data.status === 'success' && data.data.status === 'successful') {
      // Verify amount matches
      const flutterwaveAmount = data.data.amount;
      if (Math.round(flutterwaveAmount) !== Math.round(order.totalPrice)) {
        res.status(400);
        throw new Error('Amount mismatch');
      }

      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: data.data.tx_ref,
        status: data.data.status,
        update_time: data.data.created_at,
        email_address: data.data.customer.email,
      };

      // Decrement stock for each item
      for (const item of order.orderItems) {
        const product = await Product.findById(item.product);
        if (product) {
          product.countInStock = Math.max(0, product.countInStock - item.qty);
          await product.save();
        }
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(400);
      throw new Error('Payment not successful');
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        res.status(401);
        throw new Error('Flutterwave Authentication Error: Invalid Secret Key');
      } else if (status === 404) {
        res.status(404);
        throw new Error('Flutterwave Error: Transaction ID not found');
      } else {
        res.status(status || 400);
        throw new Error(data.message || 'Flutterwave Verification failed');
      }
    } else {
      res.status(500);
      throw new Error('Could not connect to Flutterwave for verification');
    }
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order tracking number
// @route   PUT /api/orders/:id/tracking
// @access  Private/Admin
const updateOrderTrackingNumber = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.trackingNumber = req.body.trackingNumber;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  updateOrderTrackingNumber,
};
