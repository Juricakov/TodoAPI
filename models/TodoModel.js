const { DataTypes } = require('sequelize');
const db = require('../config/database');

const TodoModel = db.define('todo', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		validate: {
			notEmpty: true,
		},
	},
	text: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			isAlphanumeric: true,
			notEmpty: true,
		},
	},
	completed: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

module.exports = TodoModel;
