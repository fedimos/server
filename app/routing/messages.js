var express = require('express');
var router = express.Router();

module.exports = function(messages_collection) {
	router.get('/', (req, res) => {
		res.send('It works');
	});

	return router;
};
