const express = require('express');

const messages = require('./messages');


module.exports = function(app, database) {
	var router = express.Router();

	router.use('/messages', messages(database.collection('messages')));

	// ...

	app.use('/api/v1', router);
};
