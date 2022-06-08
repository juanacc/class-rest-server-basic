const userService = require('../../services/users');
const roleService = require('../../services/roles');

exports.roleValidator = async (role = '') => {
    const existRole = await roleService.find(role);
    if(!existRole)
        throw new Error(`El rol ${role} es invalido`);
}

exports.existUser = async (email) => {
    const existUser = await userService.find(email);
    if(existUser){
        console.log('Existing user', existUser);
        throw new Error(`The user with email ${email} is already registered`);
  }
}