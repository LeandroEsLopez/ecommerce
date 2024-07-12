const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
    ref: 'User' // Referencia al modelo de usuario si es necesario
  },
  productId: {
    type: String,
    required: true,
    ref: 'Product' // Referencia al modelo de producto si es necesario
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
