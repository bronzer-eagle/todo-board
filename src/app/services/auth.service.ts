import {Injectable} from '@angular/core';
import {User} from '../modules/auth/models/user';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/do';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CommonService} from './common.service';

@Injectable()
export class AuthService {
	public isLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);

	constructor(private commonService: CommonService,
				private http: HttpClient) {
		this.checkLogin();
	}

	checkLogin() {
		const jwt = this.getToken();

		this.isLogged.next(!!jwt);
	}

	getToken() {
		return localStorage.getItem('jwt');
	}

	signUp(user: User) {
		return this.http.post(this.commonService.apiPrefixed('auth/signup'), user);
	}

	signIn(user: User) {
		return this.http.post(this.commonService.apiPrefixed('auth/login'), user).do(res => {
			const jwt = res['jwt'];

			if (jwt) {
				localStorage.setItem('jwt', jwt);
				this.isLogged.next(true);
			}
		});
	}
}
