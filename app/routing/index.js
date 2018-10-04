const express = require('express');

const activities = require('./activities');
const persons    = require('./persons');


module.exports = function(app, database) {
	var router = express.Router();

	router.use('/activities', activities(database.collection('activities')));

	router.use('/', persons(database.collection('persons')));

	// ...

	app.use('/api/v1', router);
};
