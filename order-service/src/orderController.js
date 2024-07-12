const Order = require('./orderModel');

const createOrder = async (req, res) => {
  const { customerId, productId, quantity } = req.body;

  try {
    // Crear una nueva orden
    const newOrder = new Order({
      customerId,
      productId,
      quantity
    });

    // Guardar la orden en la base de datos
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOrder
};
