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
			text: source.text,
			isCompleted: source.isCompleted
		};

		return new Todo(data);
	}
}
