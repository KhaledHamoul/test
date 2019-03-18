/*Sequelize mysql*/
var Sequelize = require('sequelize');

var mysql = {
		host: '127.0.0.1',
		username: 'root',
		password: '',
		database: 'dzindr'
	}

var sequelize = new Sequelize(
	mysql.database,
	mysql.username,
	mysql.password, {
		host: mysql.host,
		dialect: 'mysql'
	}
);

module.exports = sequelize;
