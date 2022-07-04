const {Router} = require('express');
const {getUsers, putUsers, postUsers, deleteUser, patchUsers} = require('../controllers/users');
const {validateUserCreation, validateUserUpdate, validateUserDelete} = require('../middlewares/userValidations');
const router = Router();

router.get('/', getUsers);

router.put('/:id', validateUserUpdate,putUsers);

router.post('/', validateUserCreation, postUsers);

router.delete('/:id', validateUserDelete, deleteUser);

router.patch('/', patchUsers);

module.exports = router;
