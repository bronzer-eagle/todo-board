import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import {BoardService} from '../../services/board.service';
import {Board} from '../../models/board/board';
import {Todo} from '../../models/todo/todo';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class BoardComponent implements OnInit {
	board: Board;
	newTaskText: string;
	completedTasksAmount: number;

	constructor(private boardService: BoardService,
				private router: ActivatedRoute) {
		this.completedTasksAmount = 0;
	}

	ngOnInit() {
		this._setCurrentBoard();
	}

	// Actions

	private _setCurrentBoard(): void {
		this.router.params
			.map(data => data.id)
			.switchMap(id => this.boardService.returnBoardData(id))
			.subscribe((board: Board) => {
				if (board) {
					this.board = Object.assign({}, board);
					this._listenForTasksListChange();
				}
			});
	}

	public changeStatus({id, isCompleted}) {
		console.log(`Changing status of ${id} task to: ${isCompleted ? 'completed' : 'not completed'}`);
		this.boardService.changeTaskStatus(id, isCompleted);
	}

	public removeTask(id) {
		console.log(`Removing task #${id}`);
		this.boardService.removeTask(id);
	}

	public createNewTodo() {
		if (!this.newTaskText) {
			return;
		}

		this.boardService.addNewTask(this.newTaskText, this.board.id);

		this.newTaskText = '';
	}

	// Private helpers

	private _listenForTasksListChange() {
		this.boardService.tasksList
			.subscribe((tasks: Todo[]) => {
				if (this.board) {
					this.board.tasks = tasks;
					this.completedTasksAmount = this.boardService.calculateCompletedTasks();
				}
			});
	}
}
