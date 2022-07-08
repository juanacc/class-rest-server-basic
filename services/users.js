const User = require('../models/user');

exports.find = async (email) => {
    return await User.findOne({email});
};

exports.create = async ({name, email, password, role = 'USER_ROLE', img_url = '', google = false}) => {
    const user = new User({name, email, password, role, img_url, google});
    return await user.save();
}

exports.update = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, {new: true}); //{new: true} para que me devuelva el objeto actualizado
}

exports.findById = async id => await User.findById(id);

exports.get = async (from, limit, where) => {
    return await User.find(where).skip(from).limit(limit);
}