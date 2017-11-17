import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

	constructor(
		private routeService: ActivatedRoute,
		private router: Router
	) {
	}

	ngOnInit() {
		this._checkRoute();
	}

	/**
	 * Fixing Angular bug, connected with redirects
	 * @private
	 */

	private _checkRoute() {
		this.routeService.url.subscribe(urlArr => {
			const url = urlArr[0];

			if (url.path.indexOf('auth') === -1) {
				this.router.navigateByUrl('auth/login');
			}
		});
	}
}
