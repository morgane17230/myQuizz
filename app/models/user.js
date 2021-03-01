const Sequelize = require('sequelize');
const sequelize = require('../database');

class User extends Sequelize.Model {};

User.init({
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  role: Sequelize.STRING
},{
  sequelize,
  tableName: "user"
});

module.exports = User;