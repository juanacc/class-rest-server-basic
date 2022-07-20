const {response} = require('express');
const {success, uploadFile, badRequest, internalServerError} = require('../helpers');

exports.uploadFiles = async (req, res = response) => {
    try {
        const {file} = req.files;
        await uploadFile(file, 'images');
        res.status(200).json(success({msg: 'File uploaded successfully'}));
    } catch (error) {
        console.log(error);
        res.status(500).json(internalServerError(error));
    }
}

exports.updateImage = async (req, res = response) => {
    try {
        const {collection} = req.params;
        const {file} = req.files;    
        model = req.object;
        model.img = await uploadFile(file, collection);
        model.save();
        res.status(200).json(success(model));
    } catch (error) {
        console.log(error);
        res.status(500).json(internalServerError(error));    
    }
}