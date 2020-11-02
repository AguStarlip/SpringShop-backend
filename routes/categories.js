const { Router } = require('express');
const { getCategories, getCategoryId, createCategory, updateCategory, deleteCategory } = require('../controllers/categories');
const { JWTValidate } = require('../middlewares/jwt-validate');


const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategoryId);
router.post('/', JWTValidate, createCategory);
router.put('/:id', JWTValidate, updateCategory);
router.delete('/:id', JWTValidate, deleteCategory);


module.exports = router;