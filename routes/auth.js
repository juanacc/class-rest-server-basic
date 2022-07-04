const {Router} = require('express');
const {login} = require('../controllers/auth');
const {validateUserLogin} = require('../middlewares/authValidators')

const router = Router();

router.post('/login', validateUserLogin, login)

module.exports = router;