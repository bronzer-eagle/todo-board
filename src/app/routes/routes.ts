import {Routes} from '@angular/router';

import {BoardComponent} from '../components/board/board.component';
import {BoardsListComponent} from '../components/boards-list/boards-list.component';
import {GuardService} from '../modules/shared/services/guard.service';

export const routes: Routes = [{
	path: '',
	pathMatch: 'full',
	redirectTo: 'auth',
}, {
	path: 'app',
	canActivateChild: [GuardService],
	children: [{
		path: '',
		pathMatch: 'full',
		redirectTo: 'boards-list',
	}, {
		path: 'boards-list',
		component: BoardsListComponent
	}, {
		path: 'board',
		pathMatch: 'full',
		redirectTo: 'boards-list'
	}, {
		path: 'board/:id',
		component: BoardComponent
	}]
}, {
	path: 'auth',
	loadChildren: 'app/modules/auth/auth.module#AuthModule'
}, {
	path: '**',
	redirectTo: 'auth/login'
}];
