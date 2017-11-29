const db = require('../db');
const Helper = require('../helper');

class AuthController {
	constructor() {}

	login(req, res) {
		const User = db.getModel('User');

		let currentUser = {};

		User.findOne({email: req.body.email})
			.then(user => {
				currentUser = user;

				return currentUser.verifyPassword(req.body.password)
			})
			.then(valid => {
				if (valid) {
					res.apiResponse(200, {data: `Hello ${currentUser.fullname}`});
				} else {
					res.apiResponse(403, {data: `Incorrect email or password`});
				}
			})
			.catch(error => {
				Helper.logger('Error in login', error);
				res.apiResponse(400, {message: 'Failed', error});
			});
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
