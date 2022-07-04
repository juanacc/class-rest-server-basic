const {Router} = require('express');
const { isAuthenticate } = require('../middlewares/authValidators');
const {validateUserCreation, validateUserUpdate, validateUserDelete} = require('../middlewares/userValidations');
const {getUsers, putUsers, postUsers, deleteUser, patchUsers} = require('../controllers/users');
const router = Router();

router.get('/', getUsers);

router.put('/:id', validateUserUpdate,putUsers);

router.post('/', validateUserCreation, postUsers);

router.delete('/:id', [isAuthenticate, validateUserDelete], deleteUser);

router.patch('/', patchUsers);

module.exports = router;
