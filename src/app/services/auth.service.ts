import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {User} from '../modules/auth/models/user';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/do';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
	public isLogged: BehaviorSubject<boolean> = new BehaviorSubject(null);

	constructor(private socket: WebsocketService,
				private http: HttpClient) {
		this.checkLogin();
	}

	checkLogin() {
		const jwt = localStorage.getItem('jwt');

		this.isLogged.next(!!jwt);
	}

	signUp(user: User) {
		return this.http.post('http://localhost:5000/api/auth/signup', user);
	}

	signIn(user: User) {
		return this.http.post('http://localhost:5000/api/auth/login', user).do(res => {
			const jwt = res['jwt'];

			if (jwt) {
				localStorage.setItem('jwt', jwt);
				this.isLogged.next(true);
			}
		});
	}

	setLogged() {
		window.localStorage.setItem('isLogged', 'true');
	}

}
