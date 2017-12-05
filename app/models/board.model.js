// const _capitalize = require('lodash/capitalize');
const mongoose = require('mongoose');

const Validator = require('../validator');

const Schema = mongoose.Schema;

const boardSchema = new Schema({
	boardName: {
		type: String,
		required: true
	},
	tasks: {
		type: [{type: Schema.Types.ObjectId, ref: 'Task'}],
		default: []
	}
});

boardSchema.pre('remove', function (next) {
	this.model('Task').remove({_id: {$in: this.tasks}}, next);
});

class BoardModel {
}

boardSchema.loadClass(BoardModel);

module.exports = boardSchema;
