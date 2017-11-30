const _capitalize = require('lodash/capitalize');
const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');
const jwt = require('jsonwebtoken');

const Validator = require('../validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		set: name => _capitalize(name)
	},
	lastName: {
		type: String,
		required: true,
		set: name => _capitalize(name)
	},
	email: {
		type: String,
		required: true,
		validate: Validator.email,
		unique: true,
		index: true
	},
	phoneNumber: {
		type: String,
		required: true,
		unique: true
	}
});

class UserModel {
	get fullname() {
		return this.firstName + ' ' + this.lastName;
	}

	generateJwt(addData = {}) {
		let options, expiry = new Date();

		expiry.setDate(expiry.getDate() + 7);

		options = {
			_id: this._id,
			email: this.email,
			exp: parseInt(expiry.getTime() / 1000)
		};

		Object.assign(options, addData);

		return jwt.sign(options, process.env.JWTSecret);
	};
}

userSchema.loadClass(UserModel);
userSchema.plugin(bcrypt);

module.exports = userSchema;
