const {response, request} = require('express');
const {encryptPassword} = require('../helpers/encryptPassword/handleEncryptions');
const {create, update} = require('../services/users');
const {success} = require('../helpers/response/index');

exports.getUsers = (req = request, res = response) => {
  const query = req.query;
  const { name, key, lastName = 'No last name' } = req.query;

  res.json({
    msg: 'get API - controller',
    query,
    name,
    key,
    lastName
  });
};

exports.postUsers = async (req, res = response) => {
  const {google, ...userData} = req.body;
  //Encriptar password
  userData.password = encryptPassword(userData.password);
  //Crear usuario
  const user = await create(userData);
  res.json(success(user));
};

exports.putUsers = async (req, res = response) => {
  const id = req.params.id;
  const {password, google, email, ...data} = req.body;
  if(password){
    data.password = encryptPassword(password);
  }
  const updatedUser = await update(id, data);
  res.json(success(updatedUser));
};

exports.patchUsers = (req, res = response) => {
  res.json({
    msg: 'patch API - controller'
  });
};

exports.deleteUsers = (req, res = response) => {
  res.json({
    msg: 'delete API - controller'
  });
};