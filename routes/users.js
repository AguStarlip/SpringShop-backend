const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, createUser, updateUser, changeStatusUser, deleteUser } = require('../controllers/users');

const router = Router();

router.get('/', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.put('/status/:id', changeStatusUser);
router.delete('/:id', deleteUser);


module.exports = router;