const mongoose = require('mongoose');
const Helper = require('./helper');
const schemes = require('./models');

mongoose.Promise = global.Promise;

let self = null;

class DB {
	constructor() {

		if (!self) {
			self = this;

			this.schemes = schemes || [];
			this.models = [];
		}

		return self;
	}

	init() {
		return this.connect();
	}

	connect() {
		const uri = process.env['DBURI'];
		const options = {
			useMongoClient: true
		};

		return mongoose.connect(uri, options)
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

module.exports = DB;
