import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/race';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/finally';
import {ActivatedRoute} from '@angular/router';

@Injectable()
export class WebsocketService {
	private socket: any;

	constructor() {
	}

	connect() {
		return new Observable((observer) => {
			const testServer = 'localhost:3000';
			const jwt = localStorage.getItem('jwt');

			if (jwt) {
				this.socket = io.connect(testServer, {query: `auth_token=${jwt}`});

				this.socket.on('connect', () => {
					observer.next({status: 'Connected'});
				});

				this.socket.on('connect_error', (error) => {
					observer.error({message: 'Not connected:', error});
				});
			}
		});
	}

	on(event) {
		return new Observable((observer) => {
			this.socket.on(event, data => {
				if (!data.error) {
					observer.next(data);
				} else {
					observer.error(data);
				}
			});
		});
	}

	emit(event, arg = null) {
		if (this.socket) {
			this.socket.emit(event, arg);
		}
	}
}
