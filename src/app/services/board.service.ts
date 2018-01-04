import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import findIndex from 'lodash/fp/findIndex';
import _find from 'lodash/find';
import _equal from 'lodash/isequal';

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
	currentBoardId: any;

	constructor(private http: HttpClient,
				private socket: WebsocketService,
				private commonService: CommonService) {
		this.listenForBoardListChange();
	}

	// Endpoints

	public listenForBoardListChange(): void {
		this.socket.on('setTodos')
			.map((res: [object]) => res.map(Board.transformer))
			.subscribe((boards: Board[]) => {
				this.boards.next(boards);
				this._setTasksList(boards);
			});
	}

	/**
	 * Returns board data by id
	 * @param {any} id
	 * @returns {Observable<any>}
	 */

	public returnBoardData(id: any): Observable<any> {
		const boardsList = this.boards.getValue();
		const listExists = boardsList && boardsList.length;

		this.currentBoardId = id;

		if (listExists) {
			return Observable.create(observer => {
				const board = this._getBoardDataById(id, boardsList);

				observer.next(board);
			});
		} else {
			return this.boards.map(boards => this._getBoardDataById(id, boards));
		}
	}

	// Tasks flow

	public addNewTask(taskText: string, id: string): void {
		const url = this.commonService.apiPrefixed(`boards/${id}/tasks`);

		this.http.post(url, {text: taskText})
			.subscribe(res => {
				console.log(res);
			});
	}

	public changeTaskStatus(id, isCompleted, boardId): void {
		const url = this.commonService.apiPrefixed(`boards/${boardId}/tasks/${id}`);

		this.http.put(url, {isCompleted})
			.subscribe(() => {
			});
	}

	public removeTask(id): void {
		const currentList = this.tasksList.getValue();
		const index = findIndex(currentList, task => task.id === id);

		currentList.splice(index, 1);

		this.tasksList.next(currentList);
	}

	// Boards flow

	public createBoard(data) {
		return this.http
			.post(this.commonService.apiPrefixed('boards'), data);
	}

	public removeBoard(id) {
		return this.http.delete(this.commonService.apiPrefixed(`boards/${id}`));
	}

	// Private helpers

	private _getBoardDataById(id: string, boards: Board[]): Board {
		const filtered = boards.filter(board => board.id === id);

		return filtered[0];
	}

	private _setTasksList(boards) {
		if (this.currentBoardId && boards.length) {
			const board: Board = _find(boards, {id: this.currentBoardId}) || {};
			const isEqual = _equal(this.tasksList.getValue(), board.tasks);

			if (!isEqual) {
				this.tasksList.next(board.tasks);
			}
		}
	}

	// Public helpers

	public updateCollection(prev = [], next = []) {
		next.forEach((item, index) => {
			let prevItem = prev[index];

			if (prevItem && prevItem.id === item.id) {
				console.log(prevItem);
				console.log(item);
				Object.assign(prevItem, item);
			} else {
				prev.splice(index, 1, item);
			}
		});
	}

	public calculateCompletedTasks(): number {
		const currentList = this.tasksList.getValue();

		if (currentList) {
			const completedList = currentList.filter(task => task.isCompleted);

			return completedList.length;
		}
	}

	public isEmptyTasksList(): boolean {
		return this.tasksList.getValue().length === 0;
	}
}
