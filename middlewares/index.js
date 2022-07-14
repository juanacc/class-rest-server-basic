const authValidators = require('../middlewares/authValidators');
const userValidators = require('../middlewares/userValidations');
const categoryValidators = require('../middlewares/categoryValidators');
const productValidators = require('../middlewares/productValidators');

module.exports = {
    ...authValidators,
    ...userValidators,
    ...categoryValidators,
    ...productValidators,
}
