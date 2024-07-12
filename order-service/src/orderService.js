const Order = require('./orderModel');

const createOrder = async (orderData) => {
  const { customerId, productId, quantity } = orderData;

  // Crear una nueva orden
  const newOrder = new Order({
    customerId,
    productId,
    quantity
  });

  // Guardar la orden en la base de datos
  await newOrder.save();

  return newOrder;
};

module.exports = {
  createOrder
};
