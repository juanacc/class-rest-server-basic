const {badRequest, internalServerError} = require('../response/index');

exports.userExist = 'The email is already registered';
exports.nameError = 'Name is required';
exports.emailError = 'The email is required';
exports.passwordError = 'The password is required';
exports.roleError =  role => internalServerError(`The role ${role} is not valid`);
exports.requestError = errorsArr => badRequest(errorsArr); 