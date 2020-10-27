const { Router } = require('express');
const { check } = require('express-validator');
const { getProducts, getProductId, createProduct, updateProduct, updateStockProduct, deleteProduct } = require('../controllers/products');


const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductId);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.put('/:id', updateStockProduct);
router.delete('/:id', deleteProduct);



module.exports = router;