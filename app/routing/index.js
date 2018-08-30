const express = require('express');

const activities = require('./activities');


module.exports = function(app, database) {
	var router = express.Router();

	router.use('/activities', activities(database.collection('activities')));

	// ...

	app.use('/api/v1', router);
};
