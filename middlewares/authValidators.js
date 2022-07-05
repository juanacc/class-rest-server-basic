const { response, request } = require('express');
const {check} = require('express-validator');
const errors = require('../helpers/errors/index');
const {validateFields} = require('../helpers/validators/validators');
const {unAuthorized} = require('../helpers/response');
const {verifyToken} = require('../helpers/jwt');
const {findById} = require('../services/users');

exports.validateUserLogin = [
    check('email', errors.emailError)
        .not()
        .isEmpty()
        .isEmail(),
    check('password', errors.passwordError)
        .not()
        .isEmpty(),
    validateFields
];

exports.isAuthenticate = async(req = request, res = response, next) => {
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json(unAuthorized(errors.missingToken));
    }
    try {
        const {uid} = verifyToken(token);
        req.user = await findById(uid);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json(unAuthorized(errors.invalidToken));
    }
}