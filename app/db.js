const mongoose = require('mongoose');

const schemes = require('./models');
const Helper = require('./helper');

mongoose.Promise = global.Promise;

class DB {
	constructor(schemes = []) {
		this.schemes = schemes;
		this.models = [];
	}

	init() {
		this.connect();
	}

	connect() {
		const uri = process.env['DBURI'];
		const options = {
			useMongoClient: true
		};

		mongoose.connect(uri, options)
			.then((db) => {
				this.db = db;
				this._loadSchemes();

				Helper.logger('DB connected.');
			})
			.catch(err => Helper.logger('DB connection error:', err.message))
	}

	createModel({name, schema}) {
		let model = this.db.model(name, schema);

		this.models.push(model);

		return model;
	}

	getModel(name) {
		return this.db.model(name);
	}

	// Private

	_loadSchemes() {
		this.schemes.forEach(schema => {
			this.createModel(schema);
		});
	}
}

const dbInstance = new DB(schemes);

module.exports = dbInstance;
