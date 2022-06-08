const Role = require('../models/role');

exports.find = async(role) => {
    return await Role.findOne({role});
};