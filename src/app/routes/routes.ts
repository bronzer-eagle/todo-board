import {Routes} from '@angular/router';

import {BoardComponent} from '../components/board/board.component';
import {BoardsListComponent} from '../components/boards-list/boards-list.component';

export const routes: Routes = [{
	path: '',
	pathMatch: 'full',
	redirectTo: 'app/boards-list',
}, {
	path: 'app',
	pathMatch: 'full',
	redirectTo: 'app/boards-list'
}, {
	path: 'app/boards-list',
	component: BoardsListComponent
}, {
	path: 'app/board',
	pathMatch: 'full',
	redirectTo: 'app/boards-list'
}, {
	path: 'app/board/:id',
	component: BoardComponent
}];
