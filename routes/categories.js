const {Router} = require('express');
const {getCategories, getCategory, postCategory, putCategory, deleteCategory} = require('../controllers/categories');
const {
    isAuthenticate,
    validateCategoryCreation,
    validateCategory,
    validateCategoryName,
    validateCategoryExistence,
    isAdmin
} = require('../middlewares');

const router = Router();

router.get('/', getCategories);

router.get('/:id', [validateCategory, validateCategoryExistence], getCategory);

router.post('/', [isAuthenticate, validateCategoryCreation, validateCategoryName], postCategory);

// Actualizar categoria por id - cualquier usuario con un token valido - validar id - validar nombre de categoria
router.put('/:id', [isAuthenticate, validateCategory, validateCategoryExistence, validateCategoryName], putCategory);

// Borrar una categoria - privado - solo admin
// middleware custom para validar el id categoryExists, validar id de mongo
router.delete('/:id', [isAuthenticate, isAdmin, validateCategory, validateCategoryExistence], deleteCategory);

module.exports = router;