const { Router } = require('express');
const { check } = require('express-validator');
const { JWTValidate, AdminRoleValidate } = require('../middlewares/jwt-validate');
const { FieldsValidate } = require('../middlewares/fields-validate');
const { getUser, createUser, updateUser, changeStatusUser, deleteUser } = require('../controllers/users');

const router = Router();

router.get('/', JWTValidate, getUser);
router.post('/', [
    check('name', 'El nombre es obligatorio').not().notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().notEmpty(),
    FieldsValidate,
], createUser);
router.put('/:id', [
    JWTValidate,
    AdminRoleValidate,
    check('name', 'El nombre es obligatorio').not().notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().notEmpty(),
    FieldsValidate,
], updateUser);
router.put('/status/:id', [JWTValidate, AdminRoleValidate], changeStatusUser);
router.delete('/:id', [JWTValidate, AdminRoleValidate], deleteUser);


module.exports = router;