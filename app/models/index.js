const user = require('./user.model');
const board = require('./board.model');
const task = require('./task.model');

module.exports  = [{
	name: 'User',
	schema: user
}, {
	name: 'Board',
	schema: board
}, {
	name: 'Task',
	schema: task
}];
