import {Component, OnInit} from '@angular/core';
import {WebsocketService} from './services/websocket.service';
import {ActivatedRoute} from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'Todo application';
	hideFooter: boolean;

	constructor(private websoketService: WebsocketService,
				private route: ActivatedRoute) {
	}

	ngOnInit() {
		// console.log(this.route);
		// this.route.data.subscribe(data => {
		// 	console.log(data);
		// 	this.hideFooter = data['hideFooter'];
		// });

		this.websoketService.connect()
			.subscribe((result = {}) => {
				console.log(`Root component connected! Status: ${result['status']}`);
			}, err => {
				console.log('Some error occured:', err['message']);
				console.log(err['error']);
			});
	}
}
