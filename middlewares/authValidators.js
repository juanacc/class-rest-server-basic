const { response, request } = require('express');
const {check} = require('express-validator');
const errors = require('../helpers/errors');
const {unAuthorized, badRequest} = require('../helpers/response');
const {validateFields} = require('../helpers/validators');
const {verifyToken} = require('../helpers/jwt');
const {validPassword} = require('../helpers/encryptPassword');
const {findById, find} = require('../services/users');

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

exports.existUser = async (req = request, res = response, next) => {
    const {email} = req.body;
    const user = await find(email);
    if(!user){
        return res.status(400).json(badRequest(errors.loginError));
    }
    req.user = user;
    next();
}

exports.isValidPassword = (req = request, res = response, next) => {
    const {password} = req.body;
    const userPassword = req.user.password;
    if(!validPassword(password, userPassword)){
        return res.status(400).json(badRequest(errors.loginError));
    }
    next();
}

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