const { Router } = require('express');
const { localImageRetrieve, fileUpload, cloudImageRetrieve } = require('../controllers/uploads');
const { JWTValidate } = require('../middlewares/jwt-validate');
const ExpressFileUpload = require('express-fileupload');

const router = Router();

router.use(ExpressFileUpload());

router.get('/:type/:image', localImageRetrieve);
//router.get('/cloud/:type/:cloud_image', cloudImageRetrieve);
router.put('/:type/:id', JWTValidate, fileUpload);


module.exports = router;