const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { JWTValidate } = require('../middlewares/jwt-validate');
const { FieldsValidate } = require('../middlewares/fields-validate');


const router = Router();

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().notEmpty(),
    FieldsValidate
], login);

router.post('/google', [
    check('token', 'El token de google es obligatorio').not().notEmpty(),
    FieldsValidate
], googleSignIn);

router.post('/renew', [
    JWTValidate
], renewToken);


module.exports = router;