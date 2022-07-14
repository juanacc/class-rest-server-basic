const {request, response} = require('express');
const { badRequest, collectionError, validCollections } = require('../helpers');

exports.validateCollection = (req = request, res = response, next) => {
    const {collection} = req.params;
    if(!validCollections.includes(collection))
        return res.status(400).json(badRequest(collectionError(validCollections)));
    next();
}