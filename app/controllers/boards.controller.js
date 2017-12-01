const Socket = require('../websockets');
const DB = require('../db');

class BoardsController {
	constructor() {
		this.db = new DB();

		this.socket = new Socket();
	}

	create(req, res) {
		const data = req.body;
		const Board = this.db.getModel('Board');

		Board.create(data).then(board => {
			res.apiResponse(200, {message: 'Board added', board});
			this.sendBoardList();
		}).catch(error => res.apiResponse(400, {message: 'Failed', error}));
	}

	sendBoardList() {
		console.log('get');
		const Board = this.db.getModel('Board');

		Board.find({}).then(boards => {
			let transformed = boards.map(board => {
				return {
					id: board._id,
					boardName: board.boardName,
					tasks: []
				}
			});
			this.socket.emit('setTodos', transformed);
		})
	}
}

module.exports = BoardsController;
