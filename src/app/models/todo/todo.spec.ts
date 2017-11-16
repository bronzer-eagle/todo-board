import {Todo} from './todo';

describe('Todo', () => {
	it('should create an instance', () => {
		expect(new Todo()).toBeTruthy();
	});
	it('should accept text value', () => {
		const text = 'test task';
		const todo = new Todo({text});

		expect(todo.text).toEqual(text);
	});
});
