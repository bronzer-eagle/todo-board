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
		this.socket.emit('signIn', user);

		this.http.post('http://localhost:5000/api/auth/login', 'test')
			.subscribe(res => {
				console.log(res);
			});

		return this.socket.on('signIn');
	}

	setLogged() {
		window.localStorage.setItem('isLogged', 'true');
	}

}
