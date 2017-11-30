import {Injectable} from '@angular/core';
import {CanActivateChild, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GuardService implements CanActivateChild {

	constructor(private router: Router) {
	}

	canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
		const isLogged = this._checkStorage();

		if (isLogged) {
			return true;
		} else {
			console.log('Route is protected. Please authorize.');
			this.router.navigateByUrl('auth/login');
			return false;
		}
	}

	private _checkStorage(): boolean {
		const data = window.localStorage.getItem('jwt');

		if (data) {
			return !!data;
		}

		return false;
	}

}
