import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

// Modules

import {AuthModule} from './modules/auth/auth.module';

// Components

import {AppComponent} from './app.component';
import {BoardComponent} from './components/board/board.component';
import {TodoComponent} from './components/todo/todo.component';
import { BoardsListComponent } from './components/boards-list/boards-list.component';

// Services

import {BoardService} from './services/board.service';

// Other

import {routes} from './routes/routes';


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
		AuthModule,
		RouterModule.forRoot(routes),
		HttpClientModule
	],
	providers: [BoardService],
	bootstrap: [AppComponent]
})
export class AppModule {}
