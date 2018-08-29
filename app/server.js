const express = require('express');
const mongodb = require('mongodb');

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

	// Let's instantiate our WEB server.
	const app = express();

	// Let's now apply our routing.
	routing(app, database);

	const http_server = require('http').createServer(app);

	var socket_io = require('socket.io')(http_server);
	socket_io.on('connection', function(socket) {
		/* TO DO */
	});

	// Server's ready to listen for connections.
	http_server.listen(config.application.port);

	// app.listen(config.application.port, () => {
	// 	console.log('Fedimos server now listening on : ' + config.application.port);
	// });
});
