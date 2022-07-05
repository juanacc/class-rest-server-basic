const {Router} = require('express');
const {login} = require('../controllers/auth');
const {validateUserLogin, existUser, isValidPassword} = require('../middlewares/authValidators');
const { isActiveUser } = require('../middlewares/userValidations');

const router = Router();

router.post('/login', [validateUserLogin, existUser, isActiveUser, isValidPassword], login)

module.exports = router;