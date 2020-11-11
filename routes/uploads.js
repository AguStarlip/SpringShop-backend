const { Router } = require('express');
const { imageRetrieve, fileUpload } = require('../controllers/uploads');
const { JWTValidate } = require('../middlewares/jwt-validate');
const ExpressFileUpload = require('express-fileupload');

const router = Router();

router.use(ExpressFileUpload());

router.get('/:type/:image', imageRetrieve);
router.put('/:type/:id', JWTValidate, fileUpload);


module.exports = router;