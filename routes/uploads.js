const {Router} = require('express');
const {uploadFiles, updateImage} = require('../controllers/uploads');
const {validateFiles, validateExtension, validateUploadsUpdate, existUserOrProductById} = require('../middlewares');

const router = Router();

router.post('/', [validateFiles, validateExtension], uploadFiles);
router.put('/:collection/:id', [validateFiles, validateUploadsUpdate, existUserOrProductById], updateImage);//validar que exista un usuario o un producto con el id enviado

module.exports = router;