const { check, validationResult } = require('express-validator');
const errors = require('../helpers/errors/index');
const {roleValidator,existUser} = require('../helpers/validators/validators')

const validateFields = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      console.log('ERRORS: ',err.mapped());
      res.status(400).send(errors.requestError(err.mapped()));
      return;
    }
    next();
};

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