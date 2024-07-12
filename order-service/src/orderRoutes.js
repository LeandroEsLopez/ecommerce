const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const orderController = require('./orderController');

// Validaciones para la creación de una orden
const validateOrderCreation = [
  check('customerId').notEmpty().withMessage('Customer ID is required'),
  check('productId').notEmpty().withMessage('Product ID is required'),
  check('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer')
];

router.post('/create', validateOrderCreation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, orderController.createOrder);

module.exports = router;
