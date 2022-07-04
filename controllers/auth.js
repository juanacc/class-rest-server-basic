const {response} = require('express');
const {getUser} = require('../services/auth');
const {internalServerError, badRequest} = require('../helpers/response');
const {loginError,userDeleted} = require('../helpers/errors');
const {validPassword} = require('../helpers/encryptPassword/handleEncryptions');
const {generateJWT} = require('../helpers/jwt');
const {success} = require('../helpers/response/');

exports.login = async (req, res = response) => {
    const {email, password} = req.body;
    try {
        const user = await getUser(email);
        if(!user){
            return res.status(400).json(badRequest(loginError));
        }
        if(!user.state){
            return res.status(400).json(badRequest(userDeleted));
        }
        if(!validPassword(password, user.password)){
            return res.status(400).json(badRequest(loginError));
        }
        const token = await generateJWT(user.id);
        res.json(success({token, user}));
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: internalServerError(error)
        })
    }
}