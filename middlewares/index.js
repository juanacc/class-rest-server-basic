const authValidators = require('../middlewares/authValidators');
const userValidators = require('../middlewares/userValidations');

module.exports = {
    ...authValidators,
    ...userValidators,
}
