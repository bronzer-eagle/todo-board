import {Injectable, Inject, forwardRef, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private inj: Injector) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const authService = this.inj.get(AuthService);

		const request = req.clone({

			setHeaders: {
				Authorization: `Bearer ${authService.getToken()}`
			}
		});

		return next.handle(request);
	}
}
