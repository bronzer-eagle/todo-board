const Socket = require('../websockets');
const DB = require('../db');
const Helper = require('../helper');

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

	remove(req, res) {
		const id = req.params.id;
		const Board = this.db.getModel('Board');

		Board.remove({_id: id})
			.then(() => {
				res.apiResponse(200, {message: 'Board removed'});
				this.sendBoardList();
			})
			.catch(error => res.apiResponse(400, {message: 'Failed', error}));
	}

	sendBoardList() {
		console.log('get');
		const Board = this.db.getModel('Board');

		Board.find({}).populate('tasks').then(boards => {
			Helper.logger(boards);

			let transformed = boards.map(board => {
				return {
					id: board._id,
					boardName: board.boardName,
					tasks: board.tasks
				}
			});
			this.socket.emit('setTodos', transformed);
		})
	}
}

module.exports = BoardsController;
