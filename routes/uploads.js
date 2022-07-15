const {Router} = require('express');
const {uploadFiles, updateImage} = require('../controllers/uploads');
const {validateFiles, validateExtension, validateUploadsUpdate, validateCollection} = require('../middlewares');

const router = Router();

router.post('/', [validateFiles, validateExtension], uploadFiles);
router.put('/:collection/:id', validateUploadsUpdate, updateImage);

module.exports = router;