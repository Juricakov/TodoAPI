require('dotenv').config();
const Sequelize = require('sequelize');
const db = new Sequelize(
	process.env.PGDATABASE,
	process.env.PGUSER,
	process.env.PGPASSWORD,
	{
		host: process.env.PGHOST,
		dialect: 'postgres',
		pool: {
			max: parseInt(process.env.PGPOOL_MAX),
			min: parseInt(process.env.PGPOOL_MIN),
			acquire: parseInt(process.env.PGPOOL_CONNECTION_ACQUIRE_TIMEOUT),
			idle: parseInt(process.env.PGPOOL_CONNECTION_IDLE_TIMEOUT),
		},
		logging: false,
	}
);

module.exports = db;
