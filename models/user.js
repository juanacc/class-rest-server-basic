const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
    email: {
      type: String,
      required: [true, 'The email is required'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'The password is required']
    },
    img_url: {
      type: String
    },
    role: {
      type: String,
      required: [true, 'The role is required'],
      enum: ['USER_ROLE', 'ADMIN_ROLE']
    },
    state: {
      type: Boolean,
      default: true
    },
    google: {
      type: Boolean,
      default: false
    }
  }
});

module.exports = model('User', UserSchema); // Mongoose al crear la coleccion le agrega una pluralizacion al nombre de la coleccion
