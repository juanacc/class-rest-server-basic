const {Router} = require('express');
const {getCategories, getCategory, postCategory, putCategory, deleteCategory} = require('../controllers/categories');
const {
    isAuthenticate,
    validateCategoryCreation,
    validateCategory,
    validateCategoryName,
    validateCategoryExistence} = require('../middlewares');

const router = Router();

// Obtener todas las categorias - paginado - publico
router.get('/', getCategories);

// Obtener una categoria por id - publico
// middleware custom para validar el id, se llamara categoryExists, validar id de mongo
router.get('/:id', validateCategory, getCategory);

// Crear categoria - privado - cualquier usuario con un token valido
router.post('/', [isAuthenticate, validateCategoryCreation, validateCategoryName], postCategory);

// Actualizar categoria por id - cualquier usuario con un token valido - validar id - validar nombre de categoria
router.put('/:id', [isAuthenticate, validateCategory, validateCategoryExistence, validateCategoryName], putCategory);

// Borrar una categoria - privado - solo admin
// middleware custom para validar el id categoryExists, validar id de mongo
router.delete('/:id', deleteCategory);

module.exports = router;