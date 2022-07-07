const {Router} = require('express');
const {login, googleSignIn} = require('../controllers/auth');
const {validateUserLogin, validateIdTokenGoogle, existUser, isValidPassword} = require('../middlewares/authValidators');
const { isActiveUser } = require('../middlewares/userValidations');

const router = Router();

router.post('/login', [validateUserLogin, existUser, isActiveUser, isValidPassword], login);
router.post('/google', [validateIdTokenGoogle], googleSignIn);

module.exports = router;