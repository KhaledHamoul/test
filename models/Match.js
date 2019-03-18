var Sequelize = require('sequelize');
var sequelize = require('../config/db')
var User = require('./User')

var Match = sequelize.define('match', {
  id: {
    type: Sequelize.BIGINT(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  user: Sequelize.BIGINT(11),
  propose: Sequelize.BIGINT(11),
  reaction: Sequelize.INTEGER
},
  {
    timestamps: false
  });

module.exports = Match;
