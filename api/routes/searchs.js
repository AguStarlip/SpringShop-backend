const { Router } = require('express');
const { searchAll, searchByCollection } = require('../controllers/searchs');
const { JWTValidate } = require('../middlewares/jwt-validate');

const router = Router();

router.get('/:term', JWTValidate, searchAll);
router.get('/:collection/:table/:term', searchByCollection);


module.exports = router;