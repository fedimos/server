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
	const expressApp = express();

	// Applies our routing rules.
	routing(expressApp, database);

	// Creates a HTTP server from our Express application.
	const httpServer = require('http').createServer(expressApp);

	// ... and finally creates a SocketIO object from the HTTP server.
	const socketIo = require('socket.io')(httpServer);
	socketIo.on('connection', (socket) => {
		// Registers our dedicated events listeners for this socket.
		listeners(socket);

		// Log new connections only in debug mode
		if (config.application.debug) {
			console.log(`New connection from : ${socket.client.conn.remoteAddress}`);
		}
	});

	// Server's ready to listen for connections.
	httpServer.listen(config.application.port);
	console.log(`Fedimos server now listening on : ${config.application.port}`);
});
