const errors = require('../utils').errors;


module.exports = {
	'isActivitypubStream': isActivitypubStream
};


/**
 * Verifies the `@context` field for ActivityPub streams.
 *
 * Abort with `503` on error if an EXPRESS `res` object is provided.
 * Return a boolean if not.
 */
function isActivitypubStream(data, res) {
	const activity_stream = "https://www.w3.org/ns/activitystreams";
	if (data['@context'] === activity_stream || (Array.isArray(data['@context']) && data['@context'].indexOf(activity_stream) !== -1)) {
		if (res === undefined) {
			return true;
		}
	}

	else {
		if (res !== undefined) {
			res.status(503);
			res.send({'error': errors.INVALID_DATA});
		}
		else {
			return false;
		}
	}
}
