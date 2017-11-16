import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {BoardComponent} from './components/board/board.component';
import {TodoComponent} from './components/todo/todo.component';


import {BoardService} from './services/board.service';

import {routes} from './routes/routes';
import { BoardsListComponent } from './components/boards-list/boards-list.component';


@NgModule({
	declarations: [
		AppComponent,
		BoardComponent,
		TodoComponent,
		BoardsListComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		RouterModule.forRoot(routes),
		HttpClientModule
	],
	providers: [BoardService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
