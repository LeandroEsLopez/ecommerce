const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const productService = require('./productService');

// Validaciones para la creación de un producto
const validateProductCreation = [
  check('name').notEmpty().withMessage('Name is required'),
  check('description').notEmpty().withMessage('Description is required'),
  check('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  check('quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive integer')
];

// Validaciones para la actualización de un producto
const validateProductUpdate = [
  check('name').optional().notEmpty().withMessage('Name is required'),
  check('description').optional().notEmpty().withMessage('Description is required'),
  check('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  check('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a positive integer')
];

// Ruta POST para crear un nuevo producto
router.post('/create', validateProductCreation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta PUT para actualizar un producto existente
router.put('/update/:id', validateProductUpdate, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await productService.updateProduct(productId, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
