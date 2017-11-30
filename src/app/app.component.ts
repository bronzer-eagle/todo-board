import {Component, OnInit} from '@angular/core';
import {WebsocketService} from './services/websocket.service';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from './services/common.service';
import {AuthService} from './services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'Todo application';
	hideFooter = false;

	constructor(private websoketService: WebsocketService,
				private authService: AuthService) {
	}

	ngOnInit() {
		this.authService.isLogged.subscribe(flag => {
			if (flag) {
				this.websoketService.connect()
					.subscribe((result = {}) => {
						console.log(`Root component connected! Status: ${result['status']}`);
					}, err => {
						console.log('Some error occured:', err['message']);
						console.log(err['error']);
					});
			}
		});
	}
}
