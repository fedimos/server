var express = require('express');
var router = express.Router();

module.exports = function(c_activities) {
	router.get('/', (req, res) => {
		res.send('It works');
	});

	return router;
};
