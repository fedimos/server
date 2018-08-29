'use strict';


module.exports = {
	up(db, next) {
		// Creates our first collections.
		db.createCollection('activities', {
			validator: {
				'$jsonSchema': {
					bsonType: 'object',
					required: [
						'_id',
						'activity',
					],
					additionalProperties: false,
					properties: {
						_id: {
							bsonType: 'objectId'
						},
						activity: {
							bsonType: 'object'
						}
					}
				}
			}
		});
		db.createCollection('persons', {
			validator: {
				'$jsonSchema': {
					bsonType: 'object',
					required: [
						'_id',
						'name',
						'displayName',
						'password',
						'publicIds',
						'settings',
						'lastReadTime'
					],
					additionalProperties: false,
					properties: {
						_id: {
							bsonType: 'objectId'
						},
						name: {
							bsonType: 'string'
						},
						displayName: {
							bsonType: 'string'
						},
						password: {
							bsonType: 'string'
						},
						publicIds: {
							bsonType: 'array',
							items: {
								bsonType: 'object',
								required: [
									'deviceId',
									'publicKey'
								],
								additionalProperties: false,
								properties: {
									deviceId: {
										bsonType: 'string'
									},
									publicKey: {
										bsonType: 'binData'
									}
								}
							}
						},
						settings: {
							bsonType: 'object',
							required: [
								'receiptConfirmation'
							],
							additionalProperties: false,
							properties: {
								receiptConfirmation: 'boolean'
							}
						},
						lastReadTime: {
							bsonType: 'timestamp'
						}
					}
				}
			}
		});
		db.createCollection('groups', {
			validator: {
				'$jsonSchema': {
					bsonType: 'object',
					required: [
						'_id',
						'topic',
						'userIds',
						'pinnedActivities'
					],
					additionalProperties: false,
					properties: {
						_id: {
							bsonType: 'objectId'
						},
						topic: {
							bsonType: 'string'
						},
						userIds: {
							bsonType: 'array',
							items: {
								bsonType: 'objectId'
							}
						},
						pinnedActivities:  {
							bsonType: 'array',
							items: {
								bsonType: 'objectId'
							}
						}
					}
				}
			}
		});

		next();
	},

	down(db, next) {
		// Drops collections added above.
		db.dropCollection('activities');
		db.dropCollection('persons');
		db.dropCollection('groups');

		next();
	}
};
