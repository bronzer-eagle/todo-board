import {Injectable} from '@angular/core';
import {WebsocketService} from '../../../services/websocket.service';
import {User} from '../models/user';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

	constructor(private socket: WebsocketService) {
	}

	signUp(user: User) {
		this.socket.emit('signUp', user);

		return this.socket.on('signUp');
	}

	signIn(user: User) {
		this.socket.emit('signIn', user);

		return this.socket.on('signIn');
	}

}
