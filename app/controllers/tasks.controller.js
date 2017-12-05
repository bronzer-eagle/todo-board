const DB = require('../db');
const BoardsController = require('./boards.controller');

class TasksController {
	constructor() {
		this.db = new DB();
		this.boardCtrl = new BoardsController();
	}

	addTask(req, res) {
		const text = req.body.text;
		const boardId = req.params.boardId;
		const Task = this.db.getModel('Task');
		const Board = this.db.getModel('Board');

		let task, board;

		Promise.all([
			Task.create({text}),
			Board.findById(boardId)
		]).then(result => {
			[task, board] = result;
			board.tasks.push(task._id);

			return board.save();
		}).then(() => {
			res.apiResponse(200, {
				message: 'Successfully added new task to the board.'
			});

			this.boardCtrl.sendBoardList();
		})
	}

	changeStatus(req, res) {
		const Task = this.db.getModel('Task');
		const id = req.params.id;
		const isCompleted = req.body.isCompleted;

		Task.findById(id)
			.then(task => {
				task.isCompleted = isCompleted;
				return task.save();
			})
			.then(() => {
				res.apiResponse(200, {
					message: 'Successfully changed task status.',
				});

				this.boardCtrl.sendBoardList();
			})
	}
}

module.exports = TasksController;
