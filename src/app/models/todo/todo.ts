export class Todo {
	public id: number;
	public text: string;
	public isCompleted: boolean;

	constructor(values: object = {}) {
		Object.assign(this, values);
	}

	static transformer(source): Todo {
		const data = {
			id: source.id,
			text: source.task_text,
			isCompleted: source.is_completed
		};

		return new Todo(data);
	}
}
