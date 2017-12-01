// const _capitalize = require('lodash/capitalize');
const mongoose = require('mongoose');

const Validator = require('../validator');

const Schema = mongoose.Schema;

const boardSchema = new Schema({
	boardName: {
		type: String,
		required: true
	},
	tasksIds: {
		type: [Number],
		default: []
	}
});

class BoardModel {

}

boardSchema.loadClass(BoardModel);

module.exports = boardSchema;
