import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import findIndex from 'lodash/fp/findIndex';

import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import {Todo} from '../models/todo/todo';
import {Board} from '../models/board/board';
import {WebsocketService} from './websocket.service';
import {CommonService} from './common.service';

@Injectable()
export class BoardService {
	tasksList: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
	boards: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);

	constructor(private http: HttpClient,
				private socket: WebsocketService,
				private commonService: CommonService) {
	}

	// Endpoints

	/**
	 * Get all boards from JSON
	 * @returns {Observable<any>}
	 */

	public getBoardsList(): Observable<any> {
		const listener = this.socket.on('setTodos')
			.map((res: [object]) => res.map(Board.transformer));

		listener.subscribe(this.boards);

		this.socket.emit('getTodos');

		return listener;
	}

	/**
	 * Returns board data by id
	 * @param {number} id
	 * @returns {Observable<any>}
	 */

	public returnBoardData(id: string): Observable<any> {
		const boardsList = this.boards.getValue();
		const listExists = boardsList && boardsList.length;

		if (listExists) {
			return Observable.create(observer => {
				const board = this._getBoardDataById(id, boardsList);

				observer.next(board);
			});
		}

		return this.boards.map(boards => this._getBoardDataById(id, boards));
	}

	// Actions

	public addNewTask(taskText: string, id: string): void {
		const currentList = this.tasksList.getValue();
		const url = this.commonService.apiPrefixed(`boards/${id}/tasks`);

		this.http.post(url, {text: taskText})
			.subscribe(res => {
				console.log(res);
				currentList.push(this._createNewTodoTask(taskText));

				this.tasksList.next(currentList);
			});
	}

	public isEmptyTasksList(): boolean {
		return this.tasksList.getValue().length === 0;
	}

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

	// Boards flow

	public createBoard(data) {
		return this.http.post(this.commonService.apiPrefixed('boards'), data).do(res => {
		});
	}

	//

	public calculateCompletedTasks(): number {
		const currentList = this.tasksList.getValue();
		const completedList = currentList.filter(task => task.isCompleted);

		return completedList.length;
	}

	// Private helpers

	private _generateTaskId(): number {
		const list = this.tasksList.getValue();

		if (list && list.length) {
			const id = list[list.length - 1].id;

			return id + 1;
		}

		return 0;
	}

	private _createNewTodoTask(taskText: string): Todo {
		const params = {
			id: this._generateTaskId(),
			text: taskText,
			isCompleted: false
		};

		return new Todo(params);
	}

	private _getBoardDataById(id: string, boards: Board[]): Board {
		const filtered = boards.filter(board => board.id === id);
		const currentBoard = filtered[0];

		if (currentBoard) {
			this.tasksList.next(currentBoard.tasks);
		}

		return currentBoard;
	}
}
