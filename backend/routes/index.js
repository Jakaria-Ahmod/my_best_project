const {
  loginController,
  registerContrller,
  refreshTokenController,
} = require('../controllers/loginController');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/product');
const welcome = require('../controllers/welcome');
const authMiddleware = require('../jwt/authmeddalw');
const router = require('express').Router();

// Auth Routes
router.post('/register', registerContrller);
router.post('/login', loginController);
router.post('/refresh-token', refreshTokenController);
router.get('/', authMiddleware, welcome);
// Product Routes
router.post('/product/create', authMiddleware, createProduct);
router.get('/product/get', authMiddleware, getProducts);
router.get('/product/:id', authMiddleware, getProductById);
router.put('/product/:id', authMiddleware, updateProduct);
router.delete('/product/:id', authMiddleware, deleteProduct);
module.exports = router;
