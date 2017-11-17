import {Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {Todo} from '../../models/todo/todo';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.scss'],
	encapsulation: ViewEncapsulation.Emulated
})
export class TodoComponent implements OnInit {
	@Input() todoData: Todo;
	@Output() onCheck = new EventEmitter();
	@Output() onRemove = new EventEmitter<number>();

	isCompleted: boolean;

	constructor() {
	}

	ngOnInit() {
		this.isCompleted = this.todoData.isCompleted;
	}

	// Actions

	public removeTodo(): void {
		this.onRemove.emit(this.todoData['id']);
	}

	public changeTodoStatus(): void {
		this.onCheck.emit({
			id: this.todoData['id'],
			isCompleted: this.isCompleted
		});
	}
}
