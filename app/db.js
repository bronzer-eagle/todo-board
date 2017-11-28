const stitch = require("mongodb-stitch");
const client = new stitch.StitchClient('todoapp-ypcxy');
const db = client.service('mongodb', 'mongodb-atlas').db('todos');


class DB {
	constructor() {
	}

	init() {
		this.connect();
	}

	connect() {
		client
			.login()
			.then(() => {
				console.log("[MongoDB Stitch] Connected to Stitch")
			})
			.catch(err => {
				console.error(err)
			});
	}

	insertToCollection(collection, data) {
		db.collection(collection).insertOne(data)
			.then(() => {
				console.log('inserted');
			})
	}
}

const dbInstance = new DB();

module.exports = dbInstance;


// 	.then(() =>
//
// ).then(() =>
// 	db.collection('users').find({owner_id: client.authedId()}).limit(100).execute()
// )
