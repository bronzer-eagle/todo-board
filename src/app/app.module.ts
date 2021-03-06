import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Modules

import {AuthModule} from './modules/auth/auth.module';
import {SharedModule} from './modules/shared/shared.module';

// Components

import {AppComponent} from './app.component';
import {BoardComponent} from './components/board/board.component';
import {TodoComponent} from './components/todo/todo.component';
import {BoardsListComponent} from './components/boards-list/boards-list.component';

// Directives


// Services

import {BoardService} from './services/board.service';
import {WebsocketService} from './services/websocket.service';

// Other

import {routes} from './routes/routes';
import {DataService} from './modules/shared/services/data.service';
import {CommonService} from './services/common.service';
import {AuthInterceptor} from './services/auth.interceptor';
import {AuthService} from './services/auth.service';



@NgModule({
	declarations: [
		AppComponent,
		BoardComponent,
		TodoComponent,
		BoardsListComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AuthModule,
		RouterModule.forRoot(routes),
		HttpClientModule,
		SharedModule,
		BrowserAnimationsModule
	],
	providers: [BoardService, WebsocketService, DataService, CommonService, {
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptor,
		multi: true,
	}, AuthService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
