import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BoardService} from '../../services/board.service';
import {Board} from '../../models/board/board';
import {trigger, style, animate, transition} from '@angular/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'app-boards-list',
	templateUrl: './boards-list.component.html',
	styleUrls: ['./boards-list.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: [trigger('flyInOut', [
		transition(':enter', [
			style({opacity: '0'}),
			animate('.5s ease-out', style({opacity: '1'})),
		]),
	])]
})
export class BoardsListComponent implements OnInit {
	public boards: Board[];
	public boardCreator: FormGroup;
	public boardCreationMode = false;
	public processing = false;

	constructor(private boardService: BoardService,
				private formBuilder: FormBuilder) {
		this.boards = [];
	}

	ngOnInit() {
		this._createForm();
		this._subscribeToBoardsList();
	}

	private _subscribeToBoardsList(): void {
		this.boardService.boards
			.subscribe((boardList: Board[]) => {
				this.boards = boardList;
			});
	}

	private _createForm() {
		this.boardCreator = this.formBuilder.group({
			boardName: ['', Validators.required]
		});
	}

	// Actions

	public enableBoardCreationMode() {
		this.boardCreationMode = true;
	}

	public disableBoardCreationMode() {
		this.boardCreationMode = false;
	}

	// Board CRUD flow

	public addNewBoard() {
		const data = this.boardCreator.value;

		this.processing = true;

		this.boardService.createBoard(data)
			.finally(() => this.processing = false)
			.subscribe(res => {
				console.log(res);
				this.disableBoardCreationMode();
			});
	}

	public removeBoard(id) {
		this.boardService.removeBoard(id)
			.subscribe(res => {
				console.log(res);
			});
	}
}
