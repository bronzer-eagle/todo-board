const _capitalize = require('lodash/capitalize');
const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');

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
		unique: true
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
}

userSchema.loadClass(UserModel);
userSchema.plugin(bcrypt);

module.exports = userSchema;
