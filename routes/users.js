const {Router} = require('express');
const {getUsers, putUsers, postUsers, deleteUsers, patchUsers} = require('../controllers/users');
const {validateUserCreation} = require('../middlewares/userCreation');
const router = Router();

router.get('/', getUsers);

router.put('/:id', putUsers);

router.post('/', validateUserCreation, postUsers);

router.delete('/', deleteUsers);

router.patch('/', patchUsers);

module.exports = router;
