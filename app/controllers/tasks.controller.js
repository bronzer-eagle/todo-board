const DB = require('../db');


class TasksController {
	constructor() {
		this.db = new DB();
	}

	addTask(req, res) {
		const text = req.body.text;
		const boardId = req.params.boardId;
		const Task = this.db.getModel('Task');
		const Board = this.db.getModel('Board');

		Promise.all([
			Task.create({text}),
			Board.findById(boardId)
		]).then(result => {
			const [task, board] = result;

			board.tasks.push(task._id);
			board.save();

			res.apiResponse(200, {
				message: 'Successfully added new task to the board.',
				task: {
					text: task.text,
					isCompleted: task.isCompleted,
					id: task.id
				}
			});
		});
	}
}

module.exports = TasksController;
