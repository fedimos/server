const express = require('express');
const mongodb = require('mongodb');

const config    = require('./config');
const listeners = require('./listeners');
const queuing   = require('./queuing');
const routing   = require('./routing');


// Firstly, let's try to connect to the database.
mongodb.MongoClient.connect(config.database.url, {useNewUrlParser: true}, function(err, client) {
	if (err) {
		console.log(`Could not connect to MongoDB : \"${err}\"`);
		process.exit(1);
	}

	// Below, we will use this object, representing the Fedimos DB.
	const database = client.db(config.database.name);

	// Registers our back-end asynchronous operations.
	queuing(database, config.cache.url);

	// Instantiates our Express application.
	const express_app = express();

	// Applies our routing rules.
	routing(express_app, database);

	// Creates a HTTP server from our Express application.
	const http_server = require('http').createServer(express_app);

	// ... and finally creates a SocketIO object from the HTTP server.
	const socket_io = require('socket.io')(http_server);
	socket_io.on('connection', (socket) => {
		// Registers our dedicated events listeners for this socket.
		listeners(socket);
	});

	// Server's ready to listen for connections.
	http_server.listen(config.application.port);
	console.log(`Fedimos server now listening on : ${config.application.port}`);
});
