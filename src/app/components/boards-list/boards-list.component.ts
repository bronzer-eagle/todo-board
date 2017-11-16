import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BoardService} from '../../services/board.service';
import {Board} from '../../models/board/board';

@Component({
	selector: 'app-boards-list',
	templateUrl: './boards-list.component.html',
	styleUrls: ['./boards-list.component.scss'],
	encapsulation: ViewEncapsulation.None
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
		this.boardService.getBoardsList()
			.subscribe(boardList => {
				this.boards = boardList;
			});
	}
}
