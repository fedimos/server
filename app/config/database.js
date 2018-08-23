
module.exports = {
	url: process.env.MONGODB_URL || 'mongodb://localhost:27017',
	name: process.env.DATABASE_NAME || 'fedimos'
};
