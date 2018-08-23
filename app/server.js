const express = require('express');
const mongodb = require('mongodb');
// const bodyParser = require('body-parser');

const config  = require('./config');
const routing = require('./routing');


// Firstly, let's try to connect to the database.
mongodb.MongoClient.connect(config.database.url, {useNewUrlParser: true}, function(err, client) {
	if (err) {
		console.log(`Could not connect to MongoDB : \"${err}\"`);
		process.exit(1);
	}

	// Below, we will use this object, representing the Fedimos' DB.
	database = client.db(config.database.name);

	init_db(database);

	// Let's instantiate our WEB server.
	const app = express();
	// app.use(
	// 	bodyParser.urlencoded({
	// 		extended: true
	// 	})
	// );

	// Let's now apply our routing.
	routing(app, database);

	// Server's ready to listen for connections.
	app.listen(config.application.port, () => {
		console.log('Fedimos server now listening on : ' + config.application.port);
	});
});


function init_db(database) {
	database.createCollection('messages', {
		'validator': {
			'$and': [
				{'id':        {'$type': 'objectId',  '$exists': true}},
				{'threadId':  {'$type': 'objectId',  '$exists': true}},
				{'content':   {'$type': 'binData',   '$exists': true}},
				{'userId':    {'$type': 'objectId',  '$exists': true}},
				{'datetime':  {'$type': 'timestamp', '$exists': true}}
			]
		}
	});
}
