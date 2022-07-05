const { request, response } = require('express');
const {check} = require('express-validator');
const errors = require('../helpers/errors/index');
const {badRequest, unAuthorized} = require('../helpers/response');
const {roleValidator, existUser, existUserById, validateFields} = require('../helpers/validators/validators')

exports.validateUserCreation = [
    check('name', errors.nameError)
        .not()
        .isEmpty(),
    check('email', errors.emailError)
        .not()
        .isEmpty()
        .isEmail(),
    check('email').custom(existUser),
    check('password', errors.passwordError)
        .not()
        .isEmpty(),
    //check('role').custom((role)=> roleValidator(role)), cuando tenemos un callback al que se le envia el argumento que estoy recibiendo de custom, se puede simplificar como en la linea siguiente
    check('role').custom(roleValidator),
    validateFields
];

exports.validateUserUpdate = [
    check('id', errors.idError)
        .isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(roleValidator),
    validateFields
];

exports.validateUserDelete = [
    check('id', errors.idError)
        .isMongoId(),
    check('id').custom(existUserById),
    validateFields
];

exports.userExistInDB = (req=request, res=response, next) => {
    if(!req.user){
        return res.status(401).json(unAuthorized(errors.nonexistentUser));
    }
    next();
}

exports.isActiveUser = (req=request, res=response, next) => {
    if(!req.user.state){
        return res.status(401).json(unAuthorized(errors.invalidToken));
    }
    next();
}

exports.isAdmin = (req=request, res=response, next) => {
    if(!req.user){
        return res.status(500).json({msg: 'The token was not validated'});
    }
    const {role} = req.user;
    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json(unAuthorized(errors.invalidRole));
    }

    next();
}

exports.hasARole = (...roles) => {
    return (req=request, res=response, next) => {
        if(!req.user){
            return res.status(500).json({msg: 'The token was not validated'});
        }
        if(!roles.includes(req.user.role)){
            return res.status(401).json(unAuthorized(errors.invalidRole));
        }
        next();
    }
}