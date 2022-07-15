const {Router} = require('express');
const {uploadFiles} = require('../controllers/uploads');
const {validateFiles, validateExtension} = require('../middlewares');

const router = Router();

router.post('/', [validateFiles, validateExtension], uploadFiles)

module.exports = router;