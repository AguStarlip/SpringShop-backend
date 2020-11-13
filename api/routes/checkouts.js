const { Router } = require('express');
const { createCheckoutSession, getCheckoutsCustomers, getCheckoutsItems, getCheckoutsSessions } = require('../controllers/checkouts');
const { JWTValidate } = require('../middlewares/jwt-validate');

const router = Router();

router.get('/', getCheckoutsSessions);
router.get('/', getCheckoutsCustomers);
router.get('/:id', getCheckoutsItems)
router.post('/:id', JWTValidate, createCheckoutSession);

module.exports = router;