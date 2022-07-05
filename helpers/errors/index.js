const {badRequest, internalServerError} = require('../response/index');

exports.userExist = 'The email is already registered';
exports.nameError = 'Name is required';
exports.emailError = 'The email is required';
exports.passwordError = 'The password is required';
exports.roleError =  role => internalServerError(`The role ${role} is not valid`);
exports.requestError = errorsArr => badRequest(errorsArr); 
exports.idError = 'The ID is not valid';
exports.loginError = 'Incorrect username or password';
exports.userDeleted = 'User Deleted';
exports.generateTokenError = 'Failed to generate token';
exports.missingToken = 'There is no token in the request';
exports.invalidToken = 'Invalid token';
exports.nonexistentUser = 'Nonexistent user';
exports.invalidRole = 'The user does not have the corresponding role';