const db = require('../db');
const Helper = require('../helper');

class AuthController {
	constructor() {}

	login(req, res) {
		console.log(req.body);

		res.status(200).send({data: 'success'});
	}

	signup(req, res) {
		const user = req.body;
		const User = db.getModel('User');

		User.create(user)
			.then(data => {
				Helper.logger('New user was created:', data.fullname);

				res.apiResponse(200, {data: 'User was successfully created.'});
			})
			.catch(error => {
				Helper.logger('New user was not created:', error);

				res.apiResponse(400, {message: 'Failed', error});
			});
	}
}

module.exports = AuthController;
