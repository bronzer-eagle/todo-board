class Transformer {
	constructor() {}

	static transformBoard(board) {
		return {
			id: board._id,
			boardName: board.boardName,
			tasks: board.tasks.map(Transformer.transformTask)
		}
	}

	static transformTask(task) {
		return {
			id: task._id,
			text: task.text,
			isCompleted: task.isCompleted
		}
	}
}

module.exports = Transformer;
