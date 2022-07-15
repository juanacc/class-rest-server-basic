const {response} = require('express');
const {success, uploadFile, badRequest} = require('../helpers');

exports.uploadFiles = async (req, res = response) => {
    try {
        await uploadFile(req.files, 'images');
        res.status(200).json(success({msg: 'File uploaded successfully'}));
    } catch (error) {
        console.log(error);
        res.status(400).json(badRequest(error));
    }
}