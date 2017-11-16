import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

// Components

import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([{
			path: '',
			pathMatch: 'full',
			redirectTo: 'auth/login'
		}, {
			path: 'login',
			component: LoginComponent
		}])
	],
	declarations: [AuthComponent, LoginComponent],
	bootstrap: [AuthComponent]
})
export class AuthModule {
}
