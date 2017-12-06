import {Component, OnInit} from '@angular/core';
import {WebsocketService} from './services/websocket.service';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	isLogged = false;

	constructor(private websoketService: WebsocketService,
				private authService: AuthService,
				private router: Router) {
	}

	ngOnInit() {
		this.listenForLogin();
		this.isAuthRoutes();
	}

	listenForLogin() {
		this.authService.isLogged.subscribe((flag: boolean) => {

			this.isLogged = flag;

			if (this.isLogged) {
				this.connectWebsocket();
			}
		});
	}

	connectWebsocket() {
		this.websoketService.connect()
			.subscribe((result = {}) => {
				console.log(`Websocket server connected! Status: ${result['status']}`);
			}, err => {
				console.log('Some error occured:', err['message']);
				console.log(err['error']);
			});
	}

	isAuthRoutes() {
		const availAbleRoutes = ['auth'];
		const availables = availAbleRoutes.filter(route => {
			return this.router.url.indexOf(route) !== -1;
		});

		return availables.length !== 0;
	}
}
