const {validationResult} = require('express-validator');
const userService = require('../../services/users');
const roleService = require('../../services/roles');
const errors = require('../../helpers/errors/index');

exports.validateFields = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      console.log('ERRORS: ',err.mapped());
      res.status(400).send(errors.requestError(err.mapped()));
      return;
    }
    next();
};

exports.roleValidator = async (role = '') => {
    const existRole = await roleService.find(role);
    if(!existRole)
        throw new Error(`El rol ${role} es invalido`);
}

exports.existUser = async (email = '') => {
    const existUser = await userService.find(email);
    if(existUser){
        console.log('Existing user', existUser);
        throw new Error(`The user with email ${email} is already registered`);
  }
}

exports.existUserById = async (id) => {
    const existUser = await userService.findById(id);
    if(!existUser){
        throw new Error(`The user with ID ${id} does not exist`);
  }
}