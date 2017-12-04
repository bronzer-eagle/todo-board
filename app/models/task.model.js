// const _capitalize = require('lodash/capitalize');
const mongoose = require('mongoose');

const Validator = require('../validator');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
	text: {
		type: String,
		required: true
	},
	isCompleted: {
		type: Boolean,
		default: false
	}
});

class taskModel {
}

taskSchema.loadClass(taskModel);

module.exports = taskSchema;
