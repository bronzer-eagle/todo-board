import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import findIndex from 'lodash/fp/findIndex';

import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import {Todo} from '../models/todo/todo';
import {Board} from '../models/board/board';

@Injectable()
export class BoardService {
	tasksList: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
	boards: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);

	constructor(private http: HttpClient) {
		this.getBoardsList()
			.subscribe(this.boards);
	}

	// Endpoints

	public getBoardsList(): Observable<any> {
		return this.http.get('/assets/todo-boards.json')
			.map((res: any) => res.map(Board.transformer));
	}

	public returnBoardData(id: number): Observable<any> {
		const boardsList = this.boards.getValue();

		if (boardsList && boardsList.length) {
			return Observable.create((observer) => {
				const board = this._getBoardDataById(id, boardsList);

				observer.next(board);
			});
		}

		return this.boards.map((boards) => this._getBoardDataById(id, boards));
	}

	private _getBoardDataById(id: number, boards: Board[]) {
		const filtered = boards.filter(board => {
			return board.id === id;
		});
		const currentBoard = filtered[0];

		if (currentBoard) {
			this.tasksList.next(currentBoard.tasks);
		}

		return currentBoard;
	}

	// Actions

	// public generateRandomTasks(amount: number = 3): void {
	// 	for (let i = 0; i < amount; i++) {
	// 		this.addNewTask(`Some random task #${i + 1}`);
	// 	}
	// }
	//

	public addNewTask(taskText: string): void {
		const currentList = this.tasksList.getValue();

		currentList.push(this._createNewTodoTask(taskText));

		this.tasksList.next(currentList);
	}

	// public isEmptyTasksList(): boolean {
	// 	return this.tasksList.getValue().length === 0;
	// }
	//

	public changeTaskStatus(id, isCompleted): void {
		const currentList = this.tasksList.getValue();
		const newList = currentList.map(task => {

			if (task['id'] === id) {
				task.isCompleted = isCompleted;
			}

			return task;
		});

		this.tasksList.next(newList);
	}

	public removeTask(id): void {
		const currentList = this.tasksList.getValue();
		const index = findIndex(currentList, task => task.id === id);

		currentList.splice(index, 1);

		this.tasksList.next(currentList);
	}

	//

	public calculateCompletedTasks(): number {
		const currentList = this.tasksList.getValue();
		const completedList = currentList.filter(task => task.isCompleted);

		return completedList.length;
	}

	// Private helpers

	private generateTaskId(): number {
		const list = this.tasksList.getValue();
		const id = list[list.length - 1].id;

		return id + 1;
	}

	private _createNewTodoTask(taskText: string): Todo {
		const params = {
			id: this.generateTaskId(),
			text: taskText,
			isCompleted: false
		};

		return new Todo(params);
	}
}