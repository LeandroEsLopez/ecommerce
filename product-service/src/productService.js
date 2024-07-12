const Product = require('./productModel');

const createProduct = async (productData) => {
  const { name, description, price, quantity } = productData;

  const newProduct = new Product({
    name,
    description,
    price,
    quantity
  });

  await newProduct.save();
  return newProduct;
};

const updateProduct = async (productId, productData) => {
  const { name, description, price, quantity } = productData;

  const updatedProduct = await Product.findByIdAndUpdate(productId, {
    name,
    description,
    price,
    quantity
  }, { new: true });

  return updatedProduct;
};

module.exports = {
  createProduct,
  updateProduct
};
