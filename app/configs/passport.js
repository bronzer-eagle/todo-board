const passport = require('passport');
const DB = require('../db');

class PassportConfig {
	constructor() {
		this.db = new DB();
	}

	init() {
	}
}

module.exports = new PassportConfig();
