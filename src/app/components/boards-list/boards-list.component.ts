import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BoardService} from '../../services/board.service';
import {Board} from '../../models/board/board';
import {
	trigger,
	state,
	style,
	animate,
	transition
} from '@angular/animations';

@Component({
	selector: 'app-boards-list',
	templateUrl: './boards-list.component.html',
	styleUrls: ['./boards-list.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: [trigger('flyInOut', [
		transition(':enter', [
			style({ opacity: '0' }),
			animate('.5s ease-out', style({ opacity: '1' })),
		]),
	])]
})
export class BoardsListComponent implements OnInit {
	public boards: Board[];

	constructor(private boardService: BoardService) {
		this.boards = [];
	}

	ngOnInit() {
		this._subscribeToBoardsList();
	}

	private _subscribeToBoardsList(): void {
		this.boardService.boards
			.subscribe(boardList => {
				this.boards = boardList;
			});
	}
}
