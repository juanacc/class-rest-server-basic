const authValidators = require('../middlewares/authValidators');
const userValidators = require('../middlewares/userValidations');
const categoryValidators = require('../middlewares/categoryValidators');

module.exports = {
    ...authValidators,
    ...userValidators,
    ...categoryValidators,
}
