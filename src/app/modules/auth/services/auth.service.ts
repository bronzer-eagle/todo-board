import {Injectable} from '@angular/core';
import {WebsocketService} from '../../../services/websocket.service';
import {User} from '../models/user';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

	constructor(private socket: WebsocketService,
				private http: HttpClient) {
	}

	signUp(user: User) {
		return this.http.post('http://localhost:5000/api/auth/signup', user);
	}

	signIn(user: User) {
		return this.http.post('http://localhost:5000/api/auth/login', user);
	}

	setLogged() {
		window.localStorage.setItem('isLogged', 'true');
	}

}
