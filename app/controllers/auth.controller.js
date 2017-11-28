const db = require('../db');

class AuthController {
	constructor() {

	}

	login(req, res) {
		console.log(req.body);

		res.status(200).send({data: 'success'});
	}

	signup(req, res) {
		const user = req.body;

		db.insertToCollection('users', user);

		res.status(200).send({data: 'success'});
	}
}

module.exports = AuthController;
