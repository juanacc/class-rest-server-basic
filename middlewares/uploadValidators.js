const {response} = require('express');
const {check} = require('express-validator');
const {badRequest, missingFile, validExtensions, invalidExtension, getExtensionFile, validateFields, idError, allowedCollections} = require('../helpers');

exports.validateFiles = (req, res = response, next) => {
    // !req.files: pregunta si en la request viene la propiedad file
    // si vienen los files, Object.keys(req.files).length: esta haciendo un barrido de todos los files y se fija si en alguno de ellos viene un archivo
    // !req.files.file: se valida que en la request venga el archivo llamado "file"
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json(badRequest(missingFile));
        return;
    }
    next();
}

exports.validateExtension = (req, res = response, next) => {
    const extension = getExtensionFile(req.files.file);
    if(!validExtensions.includes(extension))
        return res.status(400).json(badRequest(invalidExtension(validExtensions)));
    next();
}

exports.validateUploadsUpdate = [
    check('id', idError).isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields
]
