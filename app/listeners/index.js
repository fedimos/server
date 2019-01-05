const express = require('express');
const queuing = require('../queuing');
const utils = require('../utils');


module.exports = function(socket) {
	socket.on('activity', (activity) => {
		if (!utils.activitypub.isActivitypubStream(activity)) {
			socket.emit('fedimos_error', utils.errors.INVALID_DATA);
		}

		// Store, dispatch. Queue ?
	});
};
