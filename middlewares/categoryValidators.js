const { response, request } = require('express');
const {check} = require('express-validator');
const {categoryService} = require('../services');

const {
    validateFields,
    badRequest,
    valueAlreadyExists,
    nonexistentCategory,
    idError,
    nameError
} = require('../helpers');

exports.validateCategoryCreation = [
    check('name', nameError)
        .not()
        .isEmpty(),
    validateFields
];

exports.validateCategory = [
    check('id', idError)
        .isMongoId(),
    validateFields
];

exports.validateCategoryName = async (req = request, res = response, next) => {
    const name = req.body.name.toUpperCase();
    const categoryDB = await categoryService.findOne({name: name});
    if(categoryDB)
        return res.status(400).json(badRequest(valueAlreadyExists(categoryDB.name)));
    req.categoryName = name;
    next();
}

exports.validateCategoryExistence = async (req = request, res = response, next) => {
    const {id} = req.params;
    const categoryDB = await categoryService.findById(id);
    if(!categoryDB)
        return res.status(400).json(badRequest(nonexistentCategory));
    req.category = categoryDB;
    next();
}