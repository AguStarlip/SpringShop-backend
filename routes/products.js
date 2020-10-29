const { Router } = require('express');
const { check } = require('express-validator');
const { JWTValidate } = require('../middlewares/jwt-validate');
const { FieldsValidate } = require('../middlewares/fields-validate');
const { getProducts, getProductId, createProduct, updateProduct, updateStockProduct, deleteProduct } = require('../controllers/products');


const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductId);
router.post('/', [
    JWTValidate,
    check('name', 'El nombre es obligatorio').not().notEmpty(),
    check('unitPrice', 'El precio es obligatorio').not().notEmpty(),
    FieldsValidate
], createProduct);
router.put('/:id', [
    JWTValidate,
    check('name', 'El nombre es obligatorio').not().notEmpty(),
    check('unitPrice', 'El precio es obligatorio').not().notEmpty(),
    FieldsValidate
], updateProduct);
router.put('/stock/:id', JWTValidate, updateStockProduct);
router.delete('/:id', JWTValidate, deleteProduct);



module.exports = router;