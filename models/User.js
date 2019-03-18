var Sequelize = require('sequelize');
var sequelize = require('../config/db')
var Match = require('./Match')

var User = sequelize.define('user', {
  id: {
    type: Sequelize.BIGINT(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nom: Sequelize.STRING,
  prenom: Sequelize.STRING,
  description: Sequelize.STRING,
  sexe: Sequelize.STRING,
  age: Sequelize.INTEGER,
  pays: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  avatar: Sequelize.STRING,
  prefered: Sequelize.TEXT
},
  {
    timestamps: false
  });

module.exports = User;
