const Queue = require('bull');
const Redis = require('ioredis');


module.exports = function(database, cache_url) {
	// Implements Redis connection reusing.
	var client     = new Redis(cache_url);
	var subscriber = new Redis(cache_url);

	const queue_options = {
		createClient: (type) => {
			switch(type) {
				case 'client':
					return client;
				case 'subscriber':
					return subscriber;
				default:
					return new Redis(cache_url);
			}
		}
	};
	// ____________________________________

	// Dispatches pending activities (?)
	var queue_dispatch = new Queue('queue_dispatch', queue_options);
		queue_dispatch.process((done) => {

			// ...

			done();
		});

	// Purges old activities (?)
	var queue_purge = new Queue('queue_purge', queue_options);
		queue_purge.process((done) => {

			// ...

			done();
		});

	// ...

	return {
		queue_dispatch: queue_dispatch,
		queue_purge: queue_purge
	};
};
