import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WebsocketService {
	private socket: any;

	constructor() {
	}

	connect() {
		return new Observable((observer) => {
			const testServer = 'localhost:3000';

			this.socket = io.connect(testServer);

			this.socket.on('connect', () => {
				observer.next('connected');
			});

			this.socket.on('connect_error', (error) => {
				observer.error('not connected');
			});

		});
	}

	on(event) {
		return new Observable((observer) => {
			this.socket.on(event, data => {
				observer.next(data);
			});
		});
	}

	emit(event) {
		this.socket.emit(event);
	}
}
