const {response} = require('express');
const {success, internalServerError} = require('../helpers/response');
const {generateJWT} = require('../helpers/jwt');

exports.login = async (req, res = response) => {
    try {
        const {id} = req.user;
        const token = await generateJWT(id);
        res.json(success({token, user: req.user}));
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: internalServerError(error)
        })
    }
}