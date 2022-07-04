const {check} = require('express-validator');
const errors = require('../helpers/errors/index');
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