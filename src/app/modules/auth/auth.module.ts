import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Components

import {AuthComponent} from './auth.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';

// Modules

import {SharedModule} from '../shared/shared.module';

// Services
import {AuthService} from './services/auth.service';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SharedModule,
		ReactiveFormsModule,
		RouterModule.forChild([{
			path: '',
			data: {
				hideFooter: true
			},
			children: [{
				path: '',
				pathMatch: 'full',
				redirectTo: 'login',
			}, {
				path: 'login',
				component: LoginComponent
			}, {
				path: 'signup',
				component: SignupComponent
			}]
		}])
	],
	providers: [AuthService],
	declarations: [AuthComponent, LoginComponent, SignupComponent],
	bootstrap: [AuthComponent]
})
export class AuthModule {
}
