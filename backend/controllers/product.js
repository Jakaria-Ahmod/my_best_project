const Product = require('../models/product');

// Create Product
const createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  if (!name || !price || !description)
    return res.status(400).json({ message: 'All fields required' });

  try {
    const product = new Product({
      name,
      price,
      description,
      createdBy: req.user.id,
    });

    await product.save();
    res.status(201).json({ message: 'Product created', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json({ message: 'Products fetched', products });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Single Product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      'createdBy',
      'username email'
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Only creator can update
    if (product.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    const { name, price, description } = req.body;
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;

    await product.save();
    res.json({ message: 'Product updated', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Only creator can delete
    if (product.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    await product.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
