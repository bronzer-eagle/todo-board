import {Todo} from '../todo/todo';

export class Board {
	public id: string;
	public name: string;
	public tasks: Todo[];

	constructor(data) {
		Object.assign(this, data);
	}

	static transformer(source) {
		const data = {
			id: source.id,
			name: source.boardName,
			tasks: source.tasks.map(Todo.transformer)
		};

		return new Board(data);
	}
}
