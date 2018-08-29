'use strict';

const database = require('./database');


module.exports = {
	mongodb: {
		url: database.url,
		databaseName: database.name,
		options: {
			useNewUrlParser: true,
			connectTimeoutMS: 3600000,
			socketTimeoutMS: 3600000
		}
	},
	migrationsDir: 'migrations',
	changelogCollectionName: 'migrations'
};
