const user = require('./user.model');
const board = require('./board.model');

module.exports  = [{
	name: 'User',
	schema: user
}, {
	name: 'Board',
	schema: board
}];
