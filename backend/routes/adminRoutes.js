import express from 'express';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/products', protect, admin, getAllProducts);
router.post('/products', protect, admin, addProduct);
router.put('/products/:id', protect, admin, updateProduct);
router.delete('/products/:id', protect, admin, deleteProduct);

export default router;
